import { useEffect, useState } from 'react'
import './Contacte.css'
import { useLocation } from 'react-router-dom'
const Contacte = () => {
    const [contact, setContact] = useState([])
    const [input, setInput] = useState({})
    const [errors, setErrors] = useState([])
    const [isSent, setSente] = useState(false)

    const location = useLocation();

    const handelChange = (e) => {
        const { value, name } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const formValidation = () => {

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true
        let newError = {}
        if (!input.nomComplet || input?.nomCompelt.trim() === '') {
            console.log('error name');
            isValid = false
            newError.nomCompelt = 'Name is reuired'
        }
        if (!input.email || input?.email.trim() === '') {


            console.log('error email')
            isValid = false
            newError.email = 'email is reuired'
        } else if (!emailRegex.test(input.email)) {
            isValid = false
            newError.email = 'no form email'
        }
        if (!input.description || input.description.trim() === '') {
            console.log('error description')
            isValid = false
            newError.description = 'Description is reuired'
        }
        setErrors(newError)
        return isValid

    }
    const handelError = (filed) => {
        let err = errors[filed]
        if (err !== null) {
            return <p style={{ color: 'red' }}>{err}</p>
        }

    }
    const handelSent = () => {
        const validForm = formValidation()
        console.log(validForm)
        if (validForm) {
            setSente(true)
            setContact(prevState => {
                return [
                    ...prevState,
                    input
                ]
            })
        } else {
            setSente(false)
        }
    }
    return (
        <>
            <div id='contact'></div>
            <div className={`contact-container ${location.hash  === "#contact" ? 'mt-20' : '' }`} >

                <h1 className="contacte-title" >Contacte</h1>
                <div className="contacte">
                    <div className="contact-form">
                        <form>
                            <div className="input-container">
                                <label htmlFor="">Nom complet</label>
                                <input type="text" name='nomCompelt' onChange={handelChange} className="input-form" placeholder="Ecrire voter " />
                                {handelError('nomCompelt')}
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Email</label>
                                <input type="text" name='email' onChange={handelChange} className="input-form" placeholder="Ecrire voter mail" />
                                {handelError('email')}
                            </div>
                            <div className="input-container">
                                <label htmlFor="">Description</label>
                                <textarea name="description" cols={30} onChange={handelChange} rows={11} className='input-form' id="contact" placeholder="Ecrire voter problem">

                                </textarea>
                                {handelError('description')}
                            </div>
                        </form>
                        <button className="btn btn-contact" onClick={handelSent}>Contact</button>
                    </div>
                    <div className="contacte-image">
                        <img src="https://tse1.mm.bing.net/th?id=OIP.b7i0GdB3zRGKGoaDnDx8bwHaFi&pid=Api&P=0&h=220" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contacte