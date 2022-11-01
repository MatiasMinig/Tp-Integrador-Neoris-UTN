function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let destino = document.getElementById('destino').value;
        let nombres = document.getElementById('nombre').value;
        let apellidos = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let direccion = document.getElementById('direccion').value;
        let telefono = document.getElementById('telefono').value;
        let hijos = document.querySelector('input[name="hijos"]:checked').value;
        let numeroHijos = document.getElementById('numeroHijos').value;
        let discapacidad = document.querySelector('input[name="discapacidad"]:checked').value;
        let discapacidadDesc = document.getElementById('discapacidad-desc').value;
        let enfermedad = document.querySelector('input[name="enfermedad"]:checked').value;
        let enfermedadDesc = document.getElementById('enfermedad-desc').value;

        generatePDF(destino, nombres, apellidos, email, direccion, telefono, hijos, numeroHijos, discapacidad, discapacidadDesc,enfermedad,enfermedadDesc);
    })

});

async function generatePDF(destino, nombres, apellidos, email, direccion, telefono, hijos, numeroHijos, discapacidad, discapacidadDesc,enfermedad,enfermedadDesc) {
    const image = await loadImage("/img/formulario.jpg");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 565, 792);
    pdf.addImage(signatureImage, 'PNG', 200, 605, 300, 60);

    pdf.setFontSize(12);
    pdf.text(destino, 260, 125);

    const date = new Date();
    pdf.text(date.getUTCDate().toString(), 235, 150);
    pdf.text((date.getUTCMonth() + 1).toString(), 275, 150);
    pdf.text(date.getUTCFullYear().toString(), 320, 150);

    pdf.setFontSize(10);
    pdf.text(nombres, 170, 213);
    pdf.text(apellidos, 170, 200);
    pdf.text(direccion, 170, 400);
    pdf.text(telefono, 170, 456);
    pdf.text(email, 170, 475);

    pdf.setFillColor(0,0,0);

    if (parseInt(hijos) === 0) {
        pdf.circle(255, 374, 4, 'FD');
    } else {
        pdf.circle(190, 374, 4, 'FD');
        pdf.text(numeroHijos.toString(), 355, 378);
    }

    if (parseInt(discapacidad) === 0) {
        pdf.circle(285, 718, 4, 'FD');
    } else {
        pdf.circle(240, 718, 4, 'FD');
        pdf.text(discapacidadDesc, 350, 720);
    }

    if (parseInt(enfermedad) === 0) {
        pdf.circle(285, 680, 4, 'FD'); // primer valor largo de linea de no
    } else {
        pdf.circle(240, 680, 4, 'FD'); // primer valor largo de linea de si
        pdf.text(enfermedadDesc, 350, 680); // 680 es la altura a lo largo del pdf.
    }



    pdf.save("Promocion-Destino.pdf");

}