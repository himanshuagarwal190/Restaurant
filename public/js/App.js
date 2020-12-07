function Navbar(){
    return(
        <nav>
            <p>RESTAURANT</p>
        </nav>
    )
}
class Items extends React.Component{
    state = {items: [],
             total: Number(localStorage.getItem('total')) || 0}

    componentDidMount(){
        axios.get('https://my-online-restaurant.herokuapp.com/api/viewitems')
            .then((response)=> {
                this.setState({
                    items: response.data
                }
                )
            })
            .catch(
                console.log('Waiting to Fetch data')
            )
    }

    subtract = (e) =>{
        let count = e.target.parentElement.childNodes[1].innerHTML
        let [, itemPrice] = e.target.parentElement.childNodes[1].id.split(';')
        count--
        if(count < 0){
            count = 0
            return 0
        }
        e.target.parentElement.childNodes[1].innerHTML = count
        let total = this.state.total
        total -= Number(itemPrice)
        this.setState({
            total: total
        })
    }

    add = (e) =>{
        let count = e.target.parentElement.childNodes[1].innerHTML
        let [itemName, itemPrice] = e.target.parentElement.childNodes[1].id.split(';')
        count++
        e.target.parentElement.childNodes[1].innerHTML = count
        let total = this.state.total
        total += Number(itemPrice)
        this.setState({
            total: total
        })
        localStorage.setItem('total', total)
    }

    Order = () =>{
        this.props.history.push('/enjoy')
    }

    render(){
        let show = this.state.items.map(item =>{
            return(
                <div className="row" key={item._id}>
                    <p className="col m4">{item.name}</p>
                    <p className="col m4">{item.price}</p>
                    <div className="col m4 row">
                        <button className="col m2 waves-effect waves-light btn" onClick={this.subtract}>-</button>
                        <p className="col m6" id={`${item.name};${item.price}`}>0</p>
                        <button className="col m2 waves-effect waves-light btn" onClick={this.add}>+</button>
                    </div>
                </div>
            )
        })
        return(
            <div className="container">
                <h1 className="Menu">Menu</h1>
                <div className="row">
                    <h4 className="col m4">Name</h4>
                    <h4 className="col m4">Price per Item</h4>
                    <h4 className="col m4">Quantity</h4>
                </div>
                {show}
                <button className="waves-effect waves-light btn order" onClick={this.Order}>Place Order</button>
            </div>
        )
    }
}

class Enjoy extends React.Component{

    OrderAgain = () =>{
        this.props.history.goBack()
    }

    Checkout = () => {
        this.props.history.push('/checkout')
    }

    render(){
        return(
            <div>
                <div className="row">
                    <h4 className="col s12">Enjoy your Meal</h4>
                </div>
                <div className="row">
                    <button className="waves-effect waves-light btn order col s2 offset-s3" onClick={this.OrderAgain}>Order Again</button>
                    <button className="waves-effect waves-light btn order col s2 offset-s6" onClick={this.Checkout}>Checkout</button>
                </div>
            </div>
        )
    }
}

function Checkout(props){
    let total = Number(localStorage.getItem('total'))
    let tip = Number(total)*0.1
    localStorage.setItem('total', 0)
    return(
        <div>
            <div className="row">
            <p className="checkout">Your total Bill Amounts to Rs. {total+tip} (Food={total} + 10% Tip={tip}) </p>
        </div>
        <div className="row">
            <button className="waves-effect waves-light btn order col s2 offset-s5" onClick={() => {props.history.push('/')}}>New Session</button>
        </div>
        </div>    
    )
}

class App extends React.Component{

    componentDidMount(){
        localStorage.setItem('total', 0)
    }

    render(){
        return(
            <div>
                <Navbar />
                <ReactRouterDOM.BrowserRouter>
                    <ReactRouterDOM.Route exact path="/" component={Items} />
                    <ReactRouterDOM.Route path="/enjoy" component={Enjoy} />
                    <ReactRouterDOM.Route path="/checkout" component={Checkout} />
                </ReactRouterDOM.BrowserRouter>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))