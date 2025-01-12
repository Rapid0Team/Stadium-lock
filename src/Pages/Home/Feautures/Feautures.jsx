import { MdPresentToAll } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { GiSportMedal } from "react-icons/gi";
import { RiToolsFill } from "react-icons/ri";
import './Feautures.css'
import { Link } from "react-router-dom";
const Feautures = () => {
  return (
    <div className="feautures-container" >
      <div className="feautures">
        <div className="feautuer">
          <GiSportMedal className="feauture-icon" />
          <div className="feautur-contenu">
            <h1 className="feautur-title">Sport</h1>
            <div className="feautur-description">
              <p>FootBall | BascketBall | tenise</p>
            </div>
          </div>
        </div>
        <div className="feautuer">
          <MdEventAvailable className="feauture-icon" />
          <div className="feautur-contenu">
            <h1 className="feautur-title">Disponibilité</h1>
            <div className="feautur-description">
              <p>Disponible</p>
            </div>
          </div>
        </div>
        <div className="feautuer">
          <FaCircleDollarToSlot className="feauture-icon" />
          <div className="feautur-contenu">
            <h1 className="feautur-title">Prix</h1>
            <div className="feautur-description">
              <p>200 MAD/heure</p>
            </div>
          </div>
        </div>
        <div className="feautuer">
          <RiToolsFill className="feauture-icon" />
          <div className="feautur-contenu">
            <h1 className="feautur-title">Équipements</h1>
            <div className="feautur-description">
              <p>Pluisuer Equipment !</p>
            </div>
          </div>
        </div>
        <div className="feautuer">
          <MdPresentToAll className="feauture-icon" />
          <div className="feautur-contenu">
            <h1 className="feautur-title">Réservation</h1>
            <div className="feautur-description">
              <button  id='about' className="btn btn-reservation-feauter"> <Link to="/reserver" >Réserver</Link> </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Feautures