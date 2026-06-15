import React, { useCallback, useRef, useState } from 'react';
import './SearchBox.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { useProductSearch } from '../../hooks/useProductSearch';
import type { Product } from '../../types';

export default function SearchBox() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const focusedIndex = useRef(0);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const { data: suggestions = [], isFetching } = useProductSearch(debouncedQuery);

  const shouldShowDropdown = isOpen && suggestions.length > 0 && debouncedQuery.length >= 3;
  const shouldShowHint = query.length > 0 && query.length < 3;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setIsOpen(true);
  }

  function handleClear() {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  }

  function handleSelectItem(title: string) {
    setQuery(title);
    setIsOpen(false);
    inputRef.current?.focus();
  }

  function handleSubmit() {
    const trimmed = query.trim();
    if (trimmed.length >= 3) {
      navigate(`/shop/search/${encodeURIComponent(trimmed)}`);
      setIsOpen(false);
      setQuery('');
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setIsOpen(true);
      focusedIndex.current = 0;
      (listRef.current?.children[0] as HTMLElement | undefined)?.focus();
    } else if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  const handleListKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const children = listRef.current?.children;
    const length = children?.length ?? 0;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex.current = focusedIndex.current < length - 1 ? focusedIndex.current + 1 : 0;
      (children?.[focusedIndex.current] as HTMLElement | undefined)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusedIndex.current > 0) {
        focusedIndex.current--;
        (children?.[focusedIndex.current] as HTMLElement | undefined)?.focus();
      } else {
        focusedIndex.current = 0;
        inputRef.current?.focus();
      }
    } else if (e.key === 'Enter') {
      const title = (children?.[focusedIndex.current] as HTMLElement | undefined)?.dataset.title;
      if (title) handleSelectItem(title);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className="search-box" onBlur={handleBlur}>
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>

      <div className="search-box__wrap">
        <span className="search-box__icon" aria-hidden="true">
          {isFetching && debouncedQuery.length >= 3 ? (
            <span className="search-box__spinner" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          )}
        </span>

        <input
          id="search-input"
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Search products…"
          className="search-box__input"
          role="combobox"
          aria-expanded={shouldShowDropdown}
          aria-controls="search-dropdown"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            className="search-box__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {shouldShowHint && (
        <div className="search-box__hint" role="alert">
          Type at least 3 characters
        </div>
      )}

      {shouldShowDropdown && (
        <div
          id="search-dropdown"
          ref={listRef}
          className="search-box__dropdown"
          role="listbox"
          onKeyDown={handleListKeyDown}
        >
          {suggestions.slice(0, 6).map((product: Product) => (
            <div
              key={product.id}
              role="option"
              aria-selected={false}
              tabIndex={0}
              className="search-box__item"
              data-title={product.title}
              onClick={() => handleSelectItem(product.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSelectItem(product.title);
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="search-box__item-img"
                loading="lazy"
              />
              <div className="search-box__item-info">
                <span className="search-box__item-title">{product.title}</span>
                <span className="search-box__item-price">${product.price}</span>
              </div>
            </div>
          ))}
          <div className="search-box__footer" role="button" tabIndex={0} onClick={handleSubmit}>
            See all results for <strong>&ldquo;{query}&rdquo;</strong>
          </div>
        </div>
      )}
    </div>
  );
}
