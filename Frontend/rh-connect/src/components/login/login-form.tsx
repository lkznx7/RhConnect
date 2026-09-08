import { useState } from "react"

export function loginForm(){
    const[user , Setuser] = useState()
    const[password , Setpassword] = useState()
    const calcularEstrela = (partesCompletadas : number ) => {
        if(partesCompletadas > 10){
            throw new Error("valor informado é maior que 10")
        }else{
            let result : number = Math.round(partesCompletadas * 10);
            switch(result){
                case 1: 

            }
                 
        }
    }
    return(
    <>
    <div className="bloco-principal">
        <div id="lado-esquerdo">
            <header>
                <img src={}/>
                <h2>RH Connect</h2>
                <h6>Pessoas & Resultados</h6>
                <p>Connecta pessoas, transforam resultados</p>
            </header>
            <div>
                <svg/>
                <p> Plataforam Unificada v4.8</p>
                <h3> O ecossistema integrado <br/> para a sua joranda <br/> profissional.</h3>
                <div> 
                    <div id="b1">
                        <svg/>
                        <h6>Candidaturas Simplificadas</h6>
                        <p>Acompanhamento transparente e em tempo real de processos seletivos </p>
                    </div>
                    <div id="b2">
                        <svg/>
                        <h6>trilhas de desnevolvimento continuo</h6>
                        <p>Capacitações , competências mapeadass e plano de crescimento corporativo</p>
                    </div>
                    <div id="b3">
                        <svg/>
                        <h6>Gestão Humanizada & Transparente</h6>
                        <p>Feedback bidirecional , holerites dinâmicos e governança de ponta a ponta</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="lado-direito">

        </div>

    </div>
    </>)
}