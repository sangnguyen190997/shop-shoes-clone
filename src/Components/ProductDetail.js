import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getListProductDetail } from "../services/API/ProductsApi";
import ProductDetailLoading from "./Loading/ProductDetailLoading";
import ProductQuantity from "./ProductQuantity";
import { useSnackbar } from "notistack";
import { addToCart, getTotal, incrementQuantity } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const productById = useSelector(
    (state) => state.product.productDetail.productById
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getListProductDetail(dispatch, id);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    dispatch(getTotal());
  }, [productById]);

  const handleUpdate = (value) => {
    quantity(value);
  };

  const handleIncrement = () => {
    setQuantity((value) => value + 1);
  };

  const handleDecrement = () => {
    setQuantity((value) => value - 1);
  };

  const handleAddToCart = (product, quantity) => {
    dispatch(incrementQuantity({ product, quantity }));
    successNotication("success");
  };

  const successNotication = (variant) => {
    enqueueSnackbar("Thêm thành công sản phẩm!", {
      variant: "success",
    });
  };

  return (
    <div className="my-16">
      <div className="container px-4 lg:px-8 mx-auto">
        {loading ? (
          <ProductDetailLoading />
        ) : (
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                className="block"
                src={productById.image}
                alt={productById.title}
                height={500}
                width={500}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg font-medium">{productById.title}</h3>
              <p className="text-sm font-light mt-4">
                {productById.description}
              </p>
              <p className="mt-4">
                <span className="text-base font-medium">
                  Giá:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(productById.salePrice)}
                </span>
                {productById.promotionPercent === 0 ? null : (
                  <span className="text-sm mx-2 bg-yellow-200 line-through">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(productById.originalPrice)}
                  </span>
                )}
              </p>
              <div className="mt-4 w-32">
                <ProductQuantity
                  quantity={quantity}
                  increment={handleIncrement}
                  decrement={handleDecrement}
                  update={handleUpdate}
                />
              </div>
              <div className="mt-5 flex">
                <div
                  className="text-sm font-normal mr-2 px-4 py-1.5 inline-block border border-spacing-2 border-black text-white bg-black hover:cursor-pointer hover:text-black hover:bg-white"
                  onClick={() => handleAddToCart(productById, quantity)}
                >
                  Thêm vào giỏ hàng
                </div>

                <Link
                  to="/cart"
                  className="text-sm font-normal px-4 py-1.5 inline-block border border-spacing-2 border-black hover:cursor-pointer hover:text-white hover:bg-black"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
