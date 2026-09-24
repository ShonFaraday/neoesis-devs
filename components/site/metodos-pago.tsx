import { Landmark, Smartphone } from "lucide-react";

const METODOS = [
  { nombre: "Yape", icono: Smartphone },
  { nombre: "Plin", icono: Smartphone },
  { nombre: "Transferencia bancaria", icono: Landmark },
];

type Props = {
  centrado?: boolean;
};

export function MetodosPago({ centrado = false }: Props) {
  return (
    <div className={centrado ? "nx-pay nx-pay-center" : "nx-pay"}>
      <span>Métodos de pago:</span>
      {METODOS.map(({ nombre, icono: Icono }) => (
        <span key={nombre} className="nx-pay-pill">
          <Icono aria-hidden="true" />
          {nombre}
        </span>
      ))}
    </div>
  );
}
