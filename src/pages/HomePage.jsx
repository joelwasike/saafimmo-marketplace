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
  areaMin: '',
  areaMax: '',
};

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState(defaultFilters);
  const [useFallback, setUseFallback] = useState(false);

  const applyLocalFilters = useCallback((data, f) => {
    let filtered = [...data];

    if (f.offerType) {
      filtered = filtered.filter((item) => item.transactionType === f.offerType);
    }

    if (f.city) {
      const city = f.city.toLowerCase();
      filtered = filtered.filter((item) =>
        (item.city || '').toLowerCase().includes(city) ||
        (item.neighborhood || '').toLowerCase().includes(city)
      );
    }

    if (f.priceMin) {
      filtered = filtered.filter((item) => (item.price || 0) >= Number(f.priceMin));
    }
    if (f.priceMax) {
      filtered = filtered.filter((item) => (item.price || 0) <= Number(f.priceMax));
    }

    if (f.areaMin) {
      filtered = filtered.filter((item) => (item.area || 0) >= Number(f.areaMin));
    }
    if (f.areaMax) {
      filtered = filtered.filter((item) => (item.area || 0) <= Number(f.areaMax));
    }

    // Default sort: most recent
    filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return filtered;
  }, []);

  const fetchListings = useCallback(async (pageNum = 1, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        pageSize: PAGE_SIZE.toString(),
      });

      if (filters.offerType) params.set('transactionType', filters.offerType);
      if (filters.city) params.set('location', filters.city);
      if (filters.priceMin) params.set('priceMin', filters.priceMin);
      if (filters.priceMax) params.set('priceMax', filters.priceMax);
      if (filters.areaMin) params.set('areaMin', filters.areaMin);
      if (filters.areaMax) params.set('areaMax', filters.areaMax);

      params.set('sort', 'newest');

      const response = await fetch(`${MARKETPLACE_API}/listings?${params.toString()}`);

      if (!response.ok) throw new Error('API error');

      const data = await response.json();

      const items = data.data || data.listings || data.results || data || [];
      const total = data.total || data.totalCount || items.length;

      if (append) {
        setListings((prev) => [...prev, ...items]);
      } else {
        setListings(items);
      }

      setTotalCount(total);
      setHasMore(items.length === PAGE_SIZE);
      setUseFallback(false);
    } catch (err) {
      console.warn('API unavailable, using fallback data:', err.message);
      setUseFallback(true);

      const filtered = applyLocalFilters(sampleListings, filters);
      const start = (pageNum - 1) * PAGE_SIZE;
      const sliced = filtered.slice(start, start + PAGE_SIZE);

      if (append) {
        setListings((prev) => [...prev, ...sliced]);
      } else {
        setListings(sliced);
      }

      setTotalCount(filtered.length);
      setHasMore(start + PAGE_SIZE < filtered.length);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters, applyLocalFilters]);

  useEffect(() => {
    setPage(1);
    fetchListings(1, false);
  }, [filters]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchListings(nextPage, true);
  };

  const handleSearch = (params) => {
    setFilters((prev) => ({
      ...prev,
      city: params.location || prev.city,
      offerType: params.transactionType || prev.offerType,
    }));
    setPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <main style={{ minHeight: '100vh' }}>
      <HeroSection onSearch={handleSearch} />
      <FilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={totalCount}
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
