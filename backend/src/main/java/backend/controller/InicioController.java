package backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Arquivo responsável por receber as requisições pelo protocolo HTTP no sistema

@RestController // o RestControleer irá informar o Spring Boot que a classe possui endpoints REST
@RequestMapping("/api") // o ResquestMapping é responsável por definir um caminho base da requisição
public class InicioController{
    @GetMapping("/inicio") //o GetMapping irá definir uma rota para a requisição GET
    public String inicio(){
        return "Sistema funcionando";
    }
}