import { useNavigate, useRoutes } from "react-router-dom";
import ProductAdd from "./pages/ProductAdd";
import ProductEdit from "./pages/ProductEdit";
import ProductList from "./pages/ProductList";
import Homepage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/oder";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  // Hàm xử lý tìm kiếm
  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const response = await fetch(
        `http://localhost:3000/products?name=${query}`
      );
      const data = await response.json();

      console.log("🔍 API response:", data);
      setSearchResults(data.products || []); // ✅ Sử dụng đúng key "products"
      console.log("🔄 Updated searchResults:", data.products || []);
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm:", error);
    }
  };

  const routes = [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    {
      path: "/",
      element: (
        <Homepage handleSearch={handleSearch} searchResults={searchResults} />
      ),
    },
    { path: "product/list", element: <ProductList /> },
    { path: "product/add", element: <ProductAdd /> },
    { path: "product/edit/:id", element: <ProductEdit /> },
    {
      path: "product/detail/:id",
      element: <ProductDetail />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "checkout",
      element: <Checkout />,
    },
    {
      path: "orders",
      element: <Orders />,
    },
  ];

  const element = useRoutes(routes);
  const email = localStorage.getItem("email");
  const [emaill, setEmail] = useState("");
  const navigate = useNavigate(); // Dùng để chuyển hướng sau khi đăng xuất

  useEffect(() => {
    const storedEmail = localStorage.getItem("emaill");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setEmail(""); // Xóa email khỏi state để giao diện cập nhật
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  }
  return (
    <main>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark py-3">
        <div className="container">
          <a
            className="navbar-brand text-uppercase fw-bold text-light"
            href="/"
          >
            FASHION FLASH
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link text-light fw-semibold px-3 active"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light fw-semibold px-3"
                  href="/product/list"
                >
                  Product List
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light fw-semibold px-3"
                  href="/product/add"
                >
                  Product Add
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light fw-semibold px-3"
                  href="/register"
                >
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-light fw-semibold px-3"
                  href="/login"
                >
                  Login
                </a>
              </li>
            </ul>

            {/* Search Bar */}
            <form
              className="d-flex ms-3 align-items-center gap-2"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(e.target.search.value);
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />

              <button
                className="btn btn-outline-light"
                type="submit"
                
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#007bff")
                }
              >
                Search
              </button>

              <div
                className="d-flex align-items-center gap-2"
                style={{ whiteSpace: "nowrap" }}
              >
                {email ? (
                  <button
                    onClick={logout}
                    style={{
                      padding: "10px 15px",
                      backgroundColor: "#dc3545",
                      border: "2px solid #dc3545",
                      color: "white",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#b02a37")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#dc3545")
                    }
                  >
                    Đăng xuất
                  </button>
                ) : (
                  <p
                    style={{
                      margin: 0,
                      color: "#ffc107",
                      fontSize: "14px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Vui lòng đăng nhập
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* Nội dung chính */}
      <p>Xin chào, {email}!</p>
      <div className="container my-3">{element}</div>
      <Toaster />
    </main>
  );
}
export default App;
