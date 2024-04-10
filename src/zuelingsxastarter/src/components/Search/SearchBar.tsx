'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { ComponentProps } from 'lib/component-props';

type TSearchBar = ComponentProps;

export default function SearchBar(props: TSearchBar) {
  const styles = props?.params?.Styles || '';
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const query = searchInput?.trim()?.replace(/\s+/g, ' ');
    if (query.length === 0) {
      setError(true);
    } else {
      setError(false);
      router.push(`/search?q=${query}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const search = searchParams.get('q')?.trim()?.replace(/\s+/g, ' ') ?? '';
    setSearchInput(search);
  }, [searchParams]);

  return (
    <div className={`corp-component component-search-bar ${styles}`}>
      <div className={`h-nav__container h-logo__container`}>
        <div className="h-nav__second-group search-bar__results">
          <div className="h-nav__second-container-box ">
            <div className="search-container">
              <div className="" style={{ width: '100%' }}>
                <input
                  type="text"
                  className="search-field"
                  placeholder="  Enter a search term..."
                  id="searchTextBoxResults"
                  autoComplete="off"
                  value={searchInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="">
                <a className="black-link" id="searchButtonResults" onClick={handleSearch}>
                  Search
                </a>
              </div>
            </div>
            <div className={`search-container__error ${!error && 'hide'}`}>
              Please enter a search value...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
