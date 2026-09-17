import { useState, useEffect, useCallback } from 'react';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import PropertyGrid from '../components/PropertyGrid';
import { MARKETPLACE_API } from '../config';
import { sampleListings } from '../data/sampleListings';

const PAGE_SIZE = 12;

const defaultFilters = {
  priceMin: '',
  priceMax: '',
  offerType: '',
  city: '',
  propertyType: '',
};

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState(defaultFilters);
  const [cities, setCities] = useState([]);

  const applyLocalFilters = useCallback((data, f) => {
    let filtered = [...data];

    if (f.offerType) {
      filtered = filtered.filter((item) => item.transactionType === f.offerType);
    }

    if (f.propertyType) {
      filtered = filtered.filter((item) => item.propertyType === f.propertyType);
    }

    if (f.city) {
      const city = f.city.toLowerCase();
      filtered = filtered.filter((item) =>
        (item.city || '').toLowerCase().includes(city) ||
        (item.neighborhood || '').toLowerCase().includes(city) ||
        (item.address || '').toLowerCase().includes(city)
      );
    }

    if (f.priceMin) {
      filtered = filtered.filter((item) => (item.price || 0) >= Number(f.priceMin));
    }
    if (f.priceMax) {
      filtered = filtered.filter((item) => (item.price || 0) <= Number(f.priceMax));
    }

    // Default sort: most recent
    filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return filtered;
  }, []);

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      try {
        const params = new URLSearchParams({
          page: '1',
          pageSize: PAGE_SIZE.toString(),
        });

        if (filters.offerType) params.set('transactionType', filters.offerType);
        if (filters.propertyType) params.set('propertyType', filters.propertyType);
        if (filters.city) params.set('location', filters.city);
        if (filters.priceMin) params.set('minPrice', filters.priceMin);
        if (filters.priceMax) params.set('maxPrice', filters.priceMax);

        params.set('sort', 'newest');

        const response = await fetch(`${MARKETPLACE_API}/listings?${params.toString()}`);
        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        const items = data.data || data.listings || data.results || [];
        const total = data.total ?? data.totalCount ?? items.length;

        if (!ignore) {
          setListings(items);
          if (data.filters?.cities?.length) {
            setCities([...data.filters.cities].sort());
          }
          setTotalCount(total);
          setHasMore(PAGE_SIZE < total);
        }
      } catch (err) {
        console.warn('API unavailable, using fallback data:', err.message);

        const filtered = applyLocalFilters(sampleListings, filters);
        const sliced = filtered.slice(0, PAGE_SIZE);

        if (!ignore) {
          setListings(sliced);
          setTotalCount(filtered.length);
          setHasMore(PAGE_SIZE < filtered.length);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    };

    run();
    return () => {
      ignore = true;
    };
  }, [filters, applyLocalFilters]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    setPage(nextPage);

    try {
      const params = new URLSearchParams({
        page: nextPage.toString(),
        pageSize: PAGE_SIZE.toString(),
      });

      if (filters.offerType) params.set('transactionType', filters.offerType);
      if (filters.propertyType) params.set('propertyType', filters.propertyType);
      if (filters.city) params.set('location', filters.city);
      if (filters.priceMin) params.set('minPrice', filters.priceMin);
      if (filters.priceMax) params.set('maxPrice', filters.priceMax);

      params.set('sort', 'newest');

      const response = await fetch(`${MARKETPLACE_API}/listings?${params.toString()}`);
      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const items = data.data || data.listings || data.results || [];
      const total = data.total ?? data.totalCount ?? items.length;

      setListings((prev) => [...prev, ...items]);
      setTotalCount(total);
      setHasMore(nextPage * PAGE_SIZE < total);
    } catch (err) {
      console.warn('API load more failed, using fallback data:', err.message);
      const filtered = applyLocalFilters(sampleListings, filters);
      const start = (nextPage - 1) * PAGE_SIZE;
      const sliced = filtered.slice(start, start + PAGE_SIZE);
      setListings((prev) => [...prev, ...sliced]);
      setTotalCount(filtered.length);
      setHasMore(start + PAGE_SIZE < filtered.length);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = (params) => {
    setLoading(true);
    setFilters((prev) => ({
      ...prev,
      city: params.location || prev.city,
      offerType: params.transactionType || prev.offerType,
      propertyType: params.propertyType || prev.propertyType,
    }));
    setPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setLoading(true);
    setFilters({ ...defaultFilters, ...newFilters });
    setPage(1);
  };

  return (
    <main style={{ minHeight: '100vh' }}>
      <HeroSection onSearch={handleSearch} />
      <FilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={totalCount}
        cities={cities}
      />
      <PropertyGrid
        listings={listings}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />
    </main>
  );
}
