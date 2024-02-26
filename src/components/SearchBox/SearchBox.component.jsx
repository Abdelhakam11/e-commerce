import { useCallback, useRef, useState } from "react";
import "./SearchBox.styles.scss";
import { getSearchProducts } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const msgRef = useRef(null);
  const itemRef = useRef(0);
  const [products, setProducts] = useState([]);

  function hideList(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      listRef.current.style.display = "none";
    }
  }
  function showList() {
    listRef.current.style.display = "block";
  }
  function searchHandle(e) {
    const query = e.target.value;
    if (query.length >= 3) {
      msgRef.current.style.display = "none";
      listRef.current.style.display = "block";
      getSearchProducts(setProducts, query);
    } else if (query.length < 3) {
      msgRef.current.style.display = "block";
      setProducts([]);
    }
  }
  function queryClickHandle(title) {
    inputRef.current.value = title;
    inputRef.current.focus();
    listRef.current.style.display = "none";
  }
  function queryKeysHandle(e) {
    const key = e.keyCode;
    const query = e.target.value;
    if (key === 40) {
      e.preventDefault();
      inputRef.current.blur();
      showList();
      itemRef.current = 0;
      listRef.current.children[itemRef.current].focus();
    }
    if (key === 13) {
      if (query.length >= 3) {
        searchSubmit(query);
      } else {
        msgRef.current.style.display = "block";
      }
    }
  }
  function searchSubmit(query) {
    navigate(`/shop/search/${query}`, { replace: true });
    listRef.current.style.display = "none";
    inputRef.current.value = "";
  }
  const selectItemHandle = useCallback((e) => {
    e.preventDefault();
    const key = e.keyCode;
    const length = listRef.current.children.length;
    if (key === 40) {
      if (itemRef.current < length - 1) {
        itemRef.current += 1;
        listRef.current.children[itemRef.current].focus();
      } else {
        itemRef.current = 0;
        listRef.current.children[itemRef.current].focus();
      }
    } else if (e.keyCode === 38) {
      if (itemRef.current < length && itemRef.current > 0) {
        itemRef.current -= 1;
        listRef.current.children[itemRef.current].focus();
      } else {
        itemRef.current = 0;
        inputRef.current.focus();
      }
    } else if (e.keyCode === 13) {
      const title = listRef.current.children[itemRef.current].innerText;
      queryClickHandle(title);
    }
  }, []);

  return (
    <div className="search-box-container" onBlur={hideList}>
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        onChange={searchHandle}
        onKeyDown={queryKeysHandle}
      />
      <div
        ref={msgRef}
        className="dangerous-message"
        style={{ display: "none" }}
      >
        u must enter more than 3 chars
      </div>
      <div
        tabIndex="1"
        ref={listRef}
        className="search-list"
        onKeyDown={selectItemHandle}
      >
        {products.map((product) => (
          <div
            tabIndex="0"
            className="search-item"
            key={product.id}
            onClick={() => queryClickHandle(product.title)}
          >
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}
