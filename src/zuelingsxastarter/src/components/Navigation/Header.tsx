import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Image as JssImage, ImageField, Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { TJsonValBase } from 'src/types/jsonvalue';

type THeader = {
  fields: {
    data: {
      item: {
        headerLogo: {
          jsonValue: ImageField;
        };
      };
      top_navigations: {
        children: {
          results: TJsonValBase[];
        };
      };
      main_navigations: {
        children: {
          results: TJsonValBase[];
        };
      };
      search_helpers: {
        SearchHelperText: Field<string>;
      };
    };
  };
};

const ZPHeader = (props: THeader): JSX.Element => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [justSelectedMenu, setJustSelectedMenu] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(false);

  const { fields } = props;

  const logoImg = fields?.data?.item?.headerLogo.jsonValue;
  const topNavItems = fields?.data?.top_navigations?.children?.results;
  const topNavBtn = topNavItems && topNavItems[0];
  const mainNavItems = fields?.data?.main_navigations?.children?.results;
  const searchHelperText = fields?.data?.search_helpers?.SearchHelperText;

  const handleClickMobileBtn = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleSelectMenu = () => {
    setJustSelectedMenu(true);
    setShowMobileMenu(false);

    setTimeout(() => setJustSelectedMenu(false), 200);
  };

  const handleShowSearchModal = () => {
    setSearchInput('');
    setError(false);
    setShowSearchModal((prev) => !prev);
  };

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

  return (
    //TODO: Change version for each deployment: [Release version].[Sprint number].[Sprin's day number].[Deploy number within day]
    <div className="corp-component component-header" data-version="0.12.1.1">
      <section>
        <div>
          <div className="autofit-float autofit-row portlet-header">
            <div className="autofit-col autofit-col-expand">
              <h2 className="portlet-title-text hide">journal-article-header</h2>
            </div>
            <div className="autofit-col autofit-col-end">
              <div className="autofit-section">
                <div className="visible-interaction"></div>
              </div>
            </div>
          </div>
          <div>
            <div className="journal-content-article">
              <nav className="h-container">
                <div className="h-content">
                  <div className="h-logo__container">
                    <Link className="h-logo__link" href="/">
                      <JssImage field={logoImg} width="119" height="40" />
                    </Link>
                  </div>
                  <div className="h-nav__actions">
                    <Image
                      className="lexicon-icon lexicon-icon-search h-search_icon icon-2x"
                      src="/images/search-icon.svg"
                      alt="search"
                      width={24}
                      height={24}
                      onClick={handleShowSearchModal}
                    />
                    <Link
                      className="h-nav__button h-nav__contact-us-btn"
                      href={topNavBtn?.Link?.jsonValue.value?.href || '/'}
                    >
                      {topNavBtn?.Title.jsonValue.value}
                    </Link>
                  </div>
                </div>
                <div className="h-nav__links">
                  <div className="h-mob-logo__container">
                    <div className="h-mob-nav__logo">
                      <Link className="h-logo__link" href="/">
                        <JssImage field={logoImg} width="119" height="40" />
                      </Link>
                    </div>
                    <div className="h-mob-nav__search-logo">
                      <a className="h-logo__link" href="#">
                        <Image
                          className="lexicon-icon lexicon-icon-search h-search_icon__mobile"
                          src="/images/search-icon.svg"
                          alt="search"
                          width={24}
                          height={24}
                          onClick={handleShowSearchModal}
                        />
                      </a>
                    </div>
                    <div className="h-mob-nav__right-icons">
                      <button
                        className={`h-mob-nav__menu${showMobileMenu ? ' d-none' : ''} `}
                        onClick={handleClickMobileBtn}
                      >
                        <span>
                          <Image
                            src="/images/common/menu_black.svg"
                            alt="menu"
                            width={30}
                            height={30}
                          />
                        </span>
                      </button>
                      <button
                        className={`h-mob-nav__menu-close${showMobileMenu ? '' : ' d-none'}`}
                        onClick={handleClickMobileBtn}
                      >
                        <span aria-label="menu-close image widget">
                          <Image
                            src="/images/common/close_black.svg"
                            alt="menu-close"
                            width={30}
                            height={30}
                          />
                        </span>
                      </button>
                    </div>
                  </div>
                  <ul className={`h-nav__container ${showMobileMenu ? 'menu-visible' : ''}`}>
                    {mainNavItems?.map((item, idx) => (
                      <li key={idx} className="h-nav__list-item">
                        <Link
                          className="h-nav__link has_secondary_nav"
                          href={item?.Link?.jsonValue.value.href}
                        >
                          {item?.Title?.jsonValue?.value}
                        </Link>
                        {!!item.children?.results?.length && (
                          <div className={`h-nav__second-group ${justSelectedMenu ? 'hide' : ''}`}>
                            <div className="h-nav__second-container-box">
                              <div className="h-nav__second-title">
                                <Link
                                  onClick={handleSelectMenu}
                                  className="h-nav__second-primary-nav-link"
                                  href={item?.Link?.jsonValue.value.href}
                                >
                                  {item?.Title?.jsonValue?.value}
                                </Link>
                              </div>
                              <ul className="h-nav__second-container">
                                {item.children.results.map((elm, idx) => (
                                  <li key={idx} className="h-nav__second-nav-list-item">
                                    <Link
                                      onClick={handleSelectMenu}
                                      className="h-nav__second-nav-link"
                                      href={elm?.Link?.jsonValue.value.href}
                                    >
                                      {elm?.Title?.jsonValue.value}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                    <li className="h-nav__mob-contact-us h-nav__list-item">
                      <button
                        className="h-nav__button h-nav__contact-us-btn"
                        onClick={() => {
                          setShowMobileMenu(false);
                          router.push(topNavBtn?.Link?.jsonValue.value?.href);
                        }}
                      >
                        {topNavBtn?.Title.jsonValue.value}
                      </button>
                    </li>
                  </ul>
                  <div className="h-nav__container h-logo__container">
                    <div
                      className={`h-nav__second-group ${showSearchModal && 'search-bar_div'}`}
                      id="div_search_bar"
                    >
                      <div className="h-nav__second-container-box ">
                        <div className="search-helper__container">
                          <span className="search-helper">
                            <Text field={searchHelperText} />
                          </span>
                          <span className="search-container__close">
                            <Image
                              className="lexicon-icon lexicon-icon-times h-search_close"
                              alt="close modal"
                              src="../images/close-icon-black.svg"
                              width={16}
                              height={16}
                              onClick={handleShowSearchModal}
                            />
                          </span>
                        </div>
                        <div className="search-container">
                          <div className="col-12">
                            <input
                              type="text"
                              className="search-field"
                              placeholder="Enter a search term..."
                              id="searchTextBox"
                              autoComplete="off"
                              value={searchInput}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                            />
                          </div>
                          <div className="col-4">
                            <a className="black-link" id="searchButton" onClick={handleSearch}>
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
                  <div
                    className={`h-nav__container search-bar_div__mobile ${
                      showSearchModal && 'menu-visible'
                    }`}
                    id="div_search_bar__mobile"
                  >
                    <div className="h-nav__second-group">
                      <div className="h-nav__second-container-box">
                        <div className="search-helper__container">
                          <span className="search-helper">
                            <Text field={searchHelperText} />
                          </span>
                          <span className="search-container__close">
                            <Image
                              className="lexicon-icon lexicon-icon-search h-search_icon__mobile"
                              alt="close modal"
                              src="../images/close-icon-black.svg"
                              width={16}
                              height={16}
                              onClick={handleShowSearchModal}
                            />
                          </span>
                        </div>
                        <div className="search-container">
                          <div className="" style={{ width: '100%' }}>
                            <input
                              type="text"
                              className="search-field"
                              placeholder="  Enter a search term..."
                              id="searchTextBoxMobile"
                              autoComplete="off"
                              value={searchInput}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                            />
                          </div>
                          <div className="">
                            <a
                              className="black-link"
                              id="searchButtonMobile"
                              onClick={handleSearch}
                            >
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
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZPHeader;
