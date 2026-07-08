import FooterLojaCeslestium from "./FooterLoja";
import NavBarLoja from "./NavbarLoja";
import TabelaDeVendas from "./TabelaDeVendas";


export default function LojaCelestium () {
    return (
        <div className="flex flex-col items-center justify-center font-sans">
            <NavBarLoja />
            <TabelaDeVendas />
            <FooterLojaCeslestium />
        </div>
    )
}