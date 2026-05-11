function calcularDisponible(ingresos, egresos){
    let disponible = ingresos - egresos;
    disponible = disponible.toFixed(2);
    if(disponible < 0){
        disponible = 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidad = montoDisponible * 0.5;
    return Math.round(capacidad * 100) / 100;
}

function calcularInteresSimple(monto, tasa, plazoAnios){
    let interes = monto * (tasa / 100) * plazoAnios;
    return Math.round(interes * 100) / 100;
}

const contribucion = 100;

function calcularTotalPagar(monto, interes){
    let total = monto + interes + contribucion;
    return Math.round(total * 100) / 100;
}

function calcularCuotaMensual(total, plazoAnios){
    let cuotaMensual = total / (plazoAnios * 12);
    return Math.round(cuotaMensual * 100) / 100;
}

function aprobarCredito(capacidadPago, cuotaMensual){
    return capacidadPago >= cuotaMensual;
}