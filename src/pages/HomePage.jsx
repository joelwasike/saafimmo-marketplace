import { useState, useEffect, useCallback } from 'react';
import HeroSection from '../components/HeroSection';
import FilterBar from '../components/FilterBar';
import PropertyGrid from '../components/PropertyGrid';
import { MARKETPLACE_API } from '../config';
import { sampleListings } from '../data/sampleListings';

const PAGE_SIZE = 12;

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: '',
    transactionType: '',
  });
  const [useFallback, setUseFallback] = useState(false);

  const applyLocalFilters = useCallback((data, filter, sort, search) => {
    let filtered = [...data];

    // Apply tab filter
    if (filter !== 'all') {
      filtered = filtered.filter((item) => {
        if (filter === 'Location' || filter === 'Vente') {
          return item.transactionType === filter;
        }
        return item.propertyType === filter;
      });
    }

    // Apply search params
    if (search.location) {
      const loc = search.location.toLowerCase();
      filtered = filtered.filter((item) =>
        (item.city || '').toLowerCase().includes(loc) ||
        (item.neighborhood || '').toLowerCase().includes(loc) ||
        (item.address || '').toLowerCase().includes(loc)
      );
    }
    if (search.propertyType) {
      filtered = filtered.filter((item) => item.propertyType === search.propertyType);
    }
    if (search.transactionType) {
      filtered = filtered.filter((item) => item.transactionType === search.transactionType);
    }

    // Apply sort
    if (sort === 'price_asc') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else {
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

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

      if (activeFilter !== 'all') {
        if (activeFilter === 'Location' || activeFilter === 'Vente') {
          params.set('transactionType', activeFilter);
        } else {
          params.set('propertyType', activeFilter);
        }
      }

      if (searchParams.location) params.set('location', searchParams.location);
      if (searchParams.propertyType) params.set('propertyType', searchParams.propertyType);
      if (searchParams.transactionType) params.set('transactionType', searchParams.transactionType);
      if (sortBy === 'price_asc') params.set('sort', 'price_asc');
      else if (sortBy === 'price_desc') params.set('sort', 'price_desc');
      else params.set('sort', 'newest');

      const response = await fetch(`${MARKETPLACE_API}/listings?${params.toString()}`);

      if (!response.ok) throw new Error('API error');

      const data = await response.json();

      // Handle various API response shapes
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

      // Use sample data with local filtering
      const filtered = applyLocalFilters(sampleListings, activeFilter, sortBy, searchParams);
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
  }, [activeFilter, sortBy, searchParams, applyLocalFilters]);

  useEffect(() => {
    setPage(1);
    fetchListings(1, false);
  }, [activeFilter, sortBy, searchParams]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchListings(nextPage, true);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setActiveFilter('all');
    setPage(1);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setPage(1);
  };

  return (
    <main style={{ minHeight: '100vh' }}>
      <HeroSection onSearch={handleSearch} />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
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
