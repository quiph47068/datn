import React from "react";
import Banner from "../Components/Banner";
import { Link } from "react-router-dom";

const Iphone = () => {
  return (
    <>
      <Banner />
      <div
        style={{
          backgroundColor: "#333",
          padding: "50px 0",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <section className="p-3 bg-dark text-light rounded shadow-sm">
                <h4 className="fw-semibold mb-3">Tìm kiếm & Lọc</h4>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên sản phẩm..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Lọc theo giá:</label>
                  <select className="form-select">
                    <option value="">Tất cả</option>
                    <option value="under_10">Dưới 10 triệu</option>
                    <option value="over_10">Trên 10 triệu</option>
                  </select>
                </div>
              </section>
            </div>

            <div className="col-md-9">
              <section className="font-poppins">
                <div className="container mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h2 className="fs-2 fw-semibold text-light">IPhone</h2>
                  </div>
                </div>
                <div className="container mb-4">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm">
                        <Link to="detail">
                          <img
                            src="https://cdn.tgdd.vn/Products/Images/42/303891/s16/iphone-15-plus-green-1-2-650x650.png"
                            className="card-img-top img-fluid hover-scale"
                            alt="Product Image"
                          />
                        </Link>
                        <div className="card-body bg-dark text-center">
                          <Link
                            to="detail"
                            className="text-decoration-none text-light"
                          >
                            <h5 className="fw-semibold">iPhone 15 Plus</h5>
                          </Link>
                          <p className="text-secondary">iPhone</p>
                          <p className="text-warning fw-semibold fs-5">
                            19.790.000₫
                          </p>
                          <Link to="">
                            <button className="btn border border-warning text-light w-100 py-2 px-3 custom-hover">
                              Add to cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm">
                        <Link to="detail">
                          <img
                            src="https://cdn.tgdd.vn/Products/Images/42/303891/s16/iphone-15-plus-green-1-2-650x650.png"
                            className="card-img-top img-fluid hover-scale"
                            alt="Product Image"
                          />
                        </Link>
                        <div className="card-body bg-dark text-center">
                          <Link
                            to="detail"
                            className="text-decoration-none text-light"
                          >
                            <h5 className="fw-semibold">iPhone 15 Plus</h5>
                          </Link>
                          <p className="text-secondary">iPhone</p>
                          <p className="text-warning fw-semibold fs-5">
                            19.790.000₫
                          </p>
                          <Link to="">
                            <button className="btn border border-warning text-light w-100 py-2 px-3 custom-hover">
                              Add to cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card border-0 shadow-sm">
                        <Link to="detail">
                          <img
                            src="https://cdn.tgdd.vn/Products/Images/42/303891/s16/iphone-15-plus-green-1-2-650x650.png"
                            className="card-img-top img-fluid hover-scale"
                            alt="Product Image"
                          />
                        </Link>
                        <div className="card-body bg-dark text-center">
                          <Link
                            to="detail"
                            className="text-decoration-none text-light"
                          >
                            <h5 className="fw-semibold">iPhone 15 Plus</h5>
                          </Link>
                          <p className="text-secondary">iPhone</p>
                          <p className="text-warning fw-semibold fs-5">
                            19.790.000₫
                          </p>
                          <Link to="">
                            <button className="btn border border-warning text-light w-100 py-2 px-3 custom-hover">
                              Add to cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iphone;
