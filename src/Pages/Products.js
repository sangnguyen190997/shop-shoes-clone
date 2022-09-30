import { useDispatch, useSelector } from "react-redux";
import ProductsFilter from "../Components/ProductsFilter";
import ProductThumb from "../Components/ProductThumb";
import {
  getListProduct,
  getListProductFilter,
  getListProductPagination,
} from "../services/API/ProductsApi";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import ProductlistLoading from "../Components/Loading/ProductListLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Products() {
  const productListPagination = useSelector(
    (state) => state.product.productsPagination?.allProductPagination
  );

  const productListFilter = useSelector(
    (state) => state.product.productsFilter?.allProductFilter
  );

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categoryIds: [],
    size: [],
    colors: [],
    active: false,
  });
  const [totalPage, setTotalPage] = useState(6);
  const [isFilterBarOpen, setIsFilterbarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getListProductPagination(dispatch, {
        _page: page,
        _limit: 9,
        _sort: "originalPrice",
        _order: order,
        category: filters.categoryIds,
        color: filters.colors,
        size: filters.size,
      });
      setLoading(false);
    })();
  }, [page, order, filters]);

  useEffect(() => {
    (async () => {
      await getListProductFilter(dispatch, {
        category: filters.categoryIds,
        color: filters.colors,
        size: filters.size,
      });
    })();
  }, [page, order, filters]);

  useEffect(() => {
    const totalProduct = productListFilter?.length;
    totalProduct ? setTotalPage(Math.ceil(totalProduct / 9)) : setTotalPage(6);
  });

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleChangePage = (e, value) => {
    e.preventDefault();
    setPage(value);
  };
  const handleOrderChangeAsc = (e) => {
    e.preventDefault();
    setOrder("asc");
  };

  const handleOrderChangeDesc = (e) => {
    e.preventDefault();
    setOrder("desc");
  };

  const handleFilersChange = (newFilters) => {
    setFilters((pre) => {
      return { ...pre, ...newFilters };
    });
  };

  const handleOpenFilter = () => {
    setIsFilterbarOpen(true);
  };

  return (
    <div className="my-20 lg:my-28">
      <div className="container px-4 lg:px-8 mx-auto">
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-3">FOR YOU</h4>
          <p className="text-base font-light">
            Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần
            sẽ được cập nhật liên tục tại đây. Chắc chắn bạn sẽ tìm thấy những
            sản phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách của
            mình.
          </p>
        </div>
        <div
          className="fixed bottom-4 right-4 z-30 text-sm font-medium px-4 py-1 mb-4 inline-block border border-solid border-gray-500  text-white bg-black hover:text-black hover:bg-white hover:cursor-pointer lg:hidden animate-pulse"
          onClick={handleOpenFilter}
        >
          BỘ LỌC
        </div>
        <div className="flex justify-between">
          <div className="h-full w-1/4 hidden lg:flex flex-column">
            <ProductsFilter onChange={handleFilersChange} filters={filters} />
          </div>
          <div
            className={`lg:hidden fixed inset-y-0 left-0 z-40 h-full px-4 py-7 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r-2 ${
              isFilterBarOpen
                ? "ease-out translate-x-0"
                : "ease-in -translate-x-full"
            }`}
          >
            <div className="mb-2 flex justify-end">
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-left"
                className="opacity-70 hover:opacity-100 hover:cursor-pointer"
                onClick={() => setIsFilterbarOpen(false)}
              />
            </div>
            <ProductsFilter filters={filters} onChange={handleFilersChange} />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="flex justify-center md:justify-end">
              {productListPagination?.length ? (
                <div className="flex border border-solid border-gray-500">
                  <p
                    className={
                      order === "asc"
                        ? "text-sm font-medium px-4 py-1 hover:cursor-pointer text-white bg-black "
                        : "text-sm font-medium px-4 py-1 hover:cursor-pointer hover:text-white hover:bg-black "
                    }
                    onClick={handleOrderChangeAsc}
                  >
                    Giá tăng dần
                  </p>
                  <p
                    className={
                      order === "desc"
                        ? "text-sm font-medium px-4 py-1 hover:cursor-pointer text-white bg-black"
                        : "text-sm font-medium px-4 py-1 hover:cursor-pointer hover:text-white hover:bg-black"
                    }
                    onClick={handleOrderChangeDesc}
                  >
                    Giá giảm dần
                  </p>
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap my-8 sm:-mx-2 md:-mx-2 lg:-mx-2.5">
              {loading ? (
                <ProductlistLoading />
              ) : (
                productListPagination?.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="sm:px-2 md:px-2 lg:px-2 mb-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3"
                    >
                      <ProductThumb product={product} />
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex justify-center">
              {!productListPagination?.length && (
                <p>Sorry ! Không tìm được sản phẩm phù hợp</p>
              )}
            </div>
            <div className="flex justify-center">
              {productListPagination?.length ? (
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
