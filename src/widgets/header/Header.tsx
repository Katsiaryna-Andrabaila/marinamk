import { Langs } from "../../entities/langs"
import { Logo } from "../../shared/logo"

export const Header = ()=> {
    return (
        <header>
            <Logo />
            <Langs />
        </header>
    )
}