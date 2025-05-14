
import "./Product.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function Product() {

 const products = [
 { id: 1, image: "https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg", title: "Gulab Jamm", price: "From ₹299" },
 { id: 2, image: "https://images.livemint.com/img/2020/12/01/original/Jalebi_Kachori_Varanasi_Mint_Lounge_1606804368858_1606804380338.jpg", title: "Jalebi", price: "From ₹199" },
 { id: 3, image: "https://c.ndtvimg.com/2019-12/rt2n8olg_rasgulla_625x300_04_December_19.jpg", title: "Rasgulla", price: "From ₹350" },
 { id: 4, image: "https://www.nestleprofessional.in/sites/default/files/2022-07/Kaju-Katli.jpg", title: "Kaju Katli", price: "From ₹400" },
 { id: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-pThu97InYW-LfyFSneAVydrgiTHR_Feyw&s", title: "Mysore Pak", price: " From ₹400" },
 { id: 6, image: "https://myfoodstory.com/wp-content/uploads/2022/08/Coconut-Barfi-4-1.jpg", title: "Barfi", price: "From ₹299" },
 { id: 7, image: "https://www.murarisweets.com/cdn/shop/files/MotichoorLaddu4.png?v=1709528857", title: "Motichoor Laddu", price: "From ₹499" },
 { id: 8, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvFaIaXWg60FjTh4IhS8-iOYnl-2leFXA48g&s", title: "Pootharekulu", price: "From ₹450" },
 { id: 9, image: "https://5.imimg.com/data5/TA/BU/ER/SELLER-26007740/ajmeri-kalakand-250x250.JPG", title: "Kalakanda", price: "From ₹480" },
 { id: 10, image: "https://m.media-amazon.com/images/I/51jMHIrbLqL._AC_UF894,1000_QL80_.jpg", title: "Coconut Laddu", price: "From ₹290" },
 { id: 11, image: "https://almondhouse.com/cdn/shop/files/Bobbatu_Hires_1.jpg?v=1741002426&width=800", title: "Bobatallu", price: "From ₹440" },
 { id: 12, image: "https://www.yummyfoodrecipes.com/resources/picture/org/Tasty-Bellam-Kajjikayalu.jpg", title: "Kajjikayalu", price: " From ₹590" },
 ];




   let cartCount = 0;

  const addToCart = (product) => {
    cartCount++;
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
      cartCountElement.textContent = cartCount.toString();
      cartCountElement.style.display = "flex";
    }
    alert(`${product.title} added to cart!`);
  };

 return (
 <div id="ProductSection" >
 <div className="p1">
 <h2 className="p2">Andhra Sweets</h2>
 <div className="p3">
 {products.map((product) => (
 <div key={product.id} className="p4">
 <img src={product.image || "/placeholder.svg"} alt={product.title} className="p5" />
 <span className="p6">{product.title}</span>
 <span className="pp">{product.price}</span>
 <button className="addcart" onClick={() => addToCart(product)}>
 <FontAwesomeIcon icon={faCartPlus} className="cartbutton" />
 <h6> Add to Cart</h6>
 </button>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}

export default Product