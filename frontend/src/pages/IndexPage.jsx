import backgroundImage from '../assets/home.jpg'
export default function IndexPage(){
    return(
        <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    )
}