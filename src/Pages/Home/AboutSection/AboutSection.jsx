import { useLocation } from 'react-router-dom'
import './AboutSection.css'
const AboutSection = () => {
    const location=useLocation()
    
    return (
        <div  className={`about-container ${location.hash==='#about'?'mt-20':''}`}>
            <div className="about-content" >
                <div className="aboutUs" >
                    <div className="about-title">About US</div>
                    <div className="about-description">
                        <p>

                            <span className='about-name'>Club Sportif Étoile d'Or </span>: Situé au cœur de la ville, ce club offre des terrains modernes pour le football, le basket-ball et le tennis. Il propose des entraînements avec des coachs qualifiés, des tournois réguliers et un accès libre pour les membres. Les installations incluent un stade de football avec tribunes, un terrain de basket couvert et des courts de tennis éclairés. Adhésion accessible
                            à tous avec tarifs réduits pour étudiants et familles. Pour plus
                            d'informations : [contact].
                        </p>
                    </div>
                </div>
                <div    className="about-container-image">
                    <img  src="https://image.freepik.com/vecteurs-libre/illustration-concept-abstrait-equipe-sport-scolaire-club-scolaire-pour-enfants-sports-equipe-competitifs-pour-enfants-activite-parascolaire-tournoi-local-exercice-athletisme_335657-3498.jpg" alt="" className='about-image' />
                </div>
            </div>
        </div>
    )
}
export default AboutSection