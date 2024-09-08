import icon from "../assets/imgs/icon2.png"

const Footer = () => {
  return (
    <div className='container-fluid footer bg-dark text-white text-center py-3 '>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <img src={icon} alt="icon" />
        <h5>Market Store</h5>
      </div>
    </div>
  )
}

export default Footer