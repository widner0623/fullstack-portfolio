import "../styles/amazon.css";

function Amazon() {
    return (
    <div className="amazon">
        <img src="https://m.media-amazon.com/images/I/71Is5wdWysL._AC_SL1500_.jpg" alt="Product Image" />
        <div className="amazon-content">
            <div className="amazon-title">HP Touchscreen Laptop
17.3" laptop with Intel i3, 32GB RAM, 2TB storage.</div>
            <div className="amazon-desc">The HP 17.3" High-Performance Laptop is a 17.3-inch touchscreen laptop with Intel i3 processor, 32GB RAM, and 2TB storage—perfect for work, school, and everyday computing.</div>
            <a href="https://amzn.to/3QlArwl" target="_blank" rel="noopener noreferrer">View on Amazon</a>
        </div>
    </div>
    );
}

export default Amazon;