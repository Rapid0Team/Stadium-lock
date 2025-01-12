import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Importez les composants nommés
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas"; // Importez html2canvas

const Payment = () => {
    // Récupérez formData depuis le store Redux
    const userLogin = useSelector((state) => state.userFinded);
    const formData = useSelector((state) => state.formData);
    console.log(Object.keys(formData));
    const reservation_date = formData.reservation_date || "Unknown Date";
    const start_time = formData.start_time || "Unknown Time";
    const status = formData.status || "Unknown Status";
    const totalHours =formData.time_total || "Unknown ";
    const timeToDecimal = (time) => {
        if (time === "Unknown") return 0; // Gérer le cas où totalHours est inconnu
        const [hours, minutes] = time.split(":").map(Number);
        return hours + minutes / 60;
    };

    // Convertir totalHours en heures décimales
    const totalHoursDecimal = timeToDecimal(totalHours);

    // Calculer le prix
    const prix = totalHoursDecimal * 200;
    


    // Référence pour le code QR
    const qrCodeRef = useRef(null);

    // Fonction pour déclencher l'impression
    const handlePrint = () => {
        window.print();
    };

    // Fonction pour télécharger le code QR
    const handleDownload = () => {
        if (qrCodeRef.current) {
            // Capturez le code QR en tant qu'image
            html2canvas(qrCodeRef.current).then((canvas) => {
                // Convertissez le canvas en une URL de données
                const image = canvas.toDataURL("image/png");

                // Créez un lien de téléchargement
                const link = document.createElement("a");
                link.href = image;
                link.download = "qrcode.png"; // Nom du fichier téléchargé
                link.click(); // Déclenchez le téléchargement
            });
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen color-white">
            {userLogin.username ? (
                
                <div className="space-y-4">
                    <h1 className="mx-3 mb-5 font-bold ">Reservation successful!</h1>
                    <div className="mt-4" ref={qrCodeRef}>
                        <QRCodeCanvas
                            value={`Temps: ${reservation_date}, Statut: ${status}, Heure de debut: ${start_time}, Totale Hours ${totalHours} ,  Prix:${prix}  DH`} // Valeur du QR Code
                            size={200}
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                    <div className="space-y-4"> {/* Ajoute un espace vertical entre les boutons */}
                        <button
                            onClick={handlePrint}
                            className="block w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Imprimer le Code QR
                        </button>
                        <button
                            onClick={handleDownload}
                            className="block w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Télécharger le Code QR
                        </button>
                    </div>
                </div>
            ) : (
                // Si l'utilisateur n'est pas connecté, affichez un message
                <div className="text-center">
                    <p className="text-red-500 text-lg font-bold">
                        You must log in to make a reservation.
                    </p>
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Click here to log in.
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Payment;