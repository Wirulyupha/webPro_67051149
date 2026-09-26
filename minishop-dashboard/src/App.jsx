import { useState } from 'react'

// ================= PRODUCTS DATA =================

const products = [
    { name: 'Laptop', price: 12900, priceLabel: '฿12,900', rating: '4.3', reviews: 24, icon: '💻' },
    { name: 'Headphones', price: 1290, priceLabel: '฿1,290', rating: '4.3', reviews: 18, icon: '🎧' },
    { name: 'Backpack', price: 890, priceLabel: '฿890', rating: '4.7', reviews: 32, icon: '🎒' },
    { name: 'Smart Watch', price: 2990, priceLabel: '฿2,990', rating: '4.4', reviews: 20, icon: '⌚' },
]


// ================= HEADER =================

function Header({ cartCount }) {
    return (
        <header className="bg-white border-b border-gray-300 shadow-md">
            <div className="h-16 px-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold text-blue-600">MiniShop</h1>

                <div className="flex items-center gap-6 text-gray-600">
                    <button className="text-xl hover:text-blue-600">🔍</button>

                    <button className="relative text-xl hover:text-blue-600">
                        🛒
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    </button>

                    <button className="text-xl hover:text-blue-600">👤</button>
                </div>
            </div>
        </header>
    )
}


// ================= SIDEBAR =================

function Sidebar({ activePage, goTo }) {
    const items = [
        { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { key: 'products', label: 'Products', icon: '📦' },
        { key: 'profile', label: 'Profile', icon: '👤' },
    ]

    return (
        <aside className="w-64 bg-white border-r border-gray-300 min-h-[calc(100vh-64px)] p-3">
            <nav className="space-y-2">
                {items.map(item => (
                    <button
                        key={item.key}
                        onClick={() => goTo(item.key)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg
                            ${activePage === item.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        {item.icon}
                        <span className="text-lg font-bold">{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}


// ================= DASHBOARD =================

function DashboardPage() {
    const orders = [
        { id: 1, date: '2025-09-15', customer: 'Somchai J.', total: '฿1,260', status: 'Completed', color: 'green' },
        { id: 2, date: '2025-09-14', customer: 'Nattaya K.', total: '฿520', status: 'Processing', color: 'blue' },
        { id: 3, date: '2025-09-13', customer: 'Kritsada P.', total: '฿980', status: 'Shipped', color: 'purple' },
        { id: 4, date: '2025-09-12', customer: 'Piyaporn S.', total: '฿450', status: 'Completed', color: 'green' },
        { id: 5, date: '2025-09-11', customer: 'Thanawat C.', total: '฿1,800', status: 'Pending', color: 'yellow' },
    ]

    return (
        <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

            <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📦</div>
                    <div>
                        <p className="text-gray-500">Total Products</p>
                        <h3 className="text-3xl font-bold text-blue-600 mt-1">24</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🛒</div>
                    <div>
                        <p className="text-gray-500">Orders</p>
                        <h3 className="text-3xl font-bold text-green-600 mt-1">128</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">฿</div>
                    <div>
                        <p className="text-gray-500">Revenue</p>
                        <h3 className="text-3xl font-bold text-purple-600 mt-1">฿48,500</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow mt-8 p-6">
                <h3 className="text-xl font-bold">Recent Orders</h3>

                <div className="grid grid-cols-5 gap-4 bg-gray-100 mt-5 p-3 text-sm font-semibold text-gray-500">
                    <span>#</span>
                    <span>Date</span>
                    <span>Customer</span>
                    <span>Total</span>
                    <span>Status</span>
                </div>

                {orders.map((o, i) => (
                    <div key={o.id} className={`grid grid-cols-5 gap-4 p-4 text-sm items-center ${i < orders.length - 1 ? 'border-b' : ''}`}>
                        <span>{o.id}</span>
                        <span>{o.date}</span>
                        <span>{o.customer}</span>
                        <span>{o.total}</span>
                        <span className={`bg-${o.color}-100 text-${o.color}-600 px-3 py-1 rounded-full w-fit`}>{o.status}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


// ================= PRODUCTS =================

function ProductsPage({ onSelect }) {
    return (
        <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800">Products</h2>

            <div className="flex gap-4 mt-6">
                <input type="text" placeholder="Search products..." className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white" />
                <select className="w-48 border border-gray-300 rounded-lg px-4 py-3 bg-white">
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Accessories</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {products.map(product => (
                    <div key={product.name} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                            {product.icon}
                        </div>

                        <h3 className="text-lg font-bold mt-4">{product.name}</h3>
                        <p className="text-blue-600 font-bold mt-2">{product.priceLabel}</p>
                        <p className="text-yellow-500 mt-2">
                            ★ {product.rating}
                            <span className="text-gray-400 text-sm"> ({product.reviews})</span>
                        </p>

                        <button
                            onClick={() => onSelect(product.name)}
                            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


// ================= PRODUCT DETAIL =================

function ProductDetailPage({ product, onAddToCart }) {
    const [quantity, setQuantity] = useState(1)

    function increase() {
        setQuantity(q => q + 1)
    }

    function decrease() {
        setQuantity(q => (q > 1 ? q - 1 : 1))
    }

    function handleAdd() {
        onAddToCart(quantity)
        setQuantity(1)
    }

    return (
        <div className="max-w-5xl">
            <h2 className="text-3xl font-bold text-gray-800">Product Detail</h2>

            <div className="bg-white rounded-xl shadow p-8 mt-6">
                <div className="grid grid-cols-2 gap-8 items-center">

                    <div className="h-80 bg-gray-100 rounded-xl flex items-center justify-center text-9xl">
                        {product.icon}
                    </div>

                    <div>
                        <p className="text-gray-500">Product</p>
                        <h2 className="text-3xl font-bold mt-2">{product.name}</h2>
                        <p className="text-blue-600 text-2xl font-bold mt-4">{product.priceLabel}</p>
                        <p className="text-yellow-500 mt-3">
                            ★ {product.rating}
                            <span className="text-gray-400"> ({product.reviews})</span>
                        </p>

                        <div className="flex items-center gap-4 mt-6">
                            <button onClick={decrease} className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700">−</button>
                            <span className="w-12 text-center border py-2 rounded-lg">{quantity}</span>
                            <button onClick={increase} className="w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+</button>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                        >
                            🛒 Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


// ================= PROFILE =================

function ProfilePage() {
    return (
        <div className="max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800">Profile</h2>

            <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl shadow p-8">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl">👤</div>
                        <h2 className="text-2xl font-bold mt-4">Alex Student</h2>
                        <p className="text-gray-500 mt-2">alex@email.com</p>
                        <p className="text-gray-500 mt-2">Student ID: 6501234567</p>
                        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">✎ Edit Profile</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow p-8">
                    <h3 className="text-xl font-bold">Account Summary</h3>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-blue-50 p-5 rounded-xl">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🛒</div>
                            <div>
                                <p className="text-gray-500">Total Orders</p>
                                <h3 className="text-3xl font-bold text-black-600 mt-1">128</h3>
                            </div>
                        </div>
                        <div className="bg-purple-50 p-5 rounded-xl">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">฿</div>
                            <div>
                                <p className="text-gray-500">Total Spent</p>
                                <h3 className="text-3xl font-bold text-black-600 mt-1">฿48,500</h3>
                            </div>
                        </div>
                        <div className="bg-green-50 p-5 rounded-xl">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">📦</div>
                            <div>
                                <p className="text-gray-500">Wishlist Items</p>
                                <h3 className="text-3xl font-bold text-black-600 mt-1">6</h3>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-5 rounded-xl">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">⭐</div>
                            <div>
                                <p className="text-gray-500">Loyalty Points</p>
                                <h3 className="text-3xl font-bold text-black-600 mt-1">320</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// ================= APP =================

function App() {
    
    const [page, setPage] = useState('dashboard')

    const [selectedProductName, setSelectedProductName] = useState(null)

    const [cart, setCart] = useState({})

    const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

    function goTo(nextPage) {
        setSelectedProductName(null) 
        setPage(nextPage)
    }

    function selectProduct(name) {
        setSelectedProductName(name)
    }

    function addToCart(name, quantity) {
        setCart(prev => ({
            ...prev,
            [name]: (prev[name] || 0) + quantity,
        }))
    }

    const selectedProduct = products.find(p => p.name === selectedProductName)

    function renderContent() {
        if (selectedProduct) {
            return (
                <ProductDetailPage
                    product={selectedProduct}
                    onAddToCart={(qty) => addToCart(selectedProduct.name, qty)}
                />
            )
        }

        if (page === 'products') return <ProductsPage onSelect={selectProduct} />
        if (page === 'profile') return <ProfilePage />
        return <DashboardPage />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header cartCount={cartCount} />

            <div className="flex">
                <Sidebar activePage={page} goTo={goTo} />

                <main className="flex-1 p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    )
}

export default App