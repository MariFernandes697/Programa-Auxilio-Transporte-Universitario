package backend.controller;

import backend.entity.Estudante;
import backend.service.EstudanteService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//o RestController Indica que a classe Estudantecontroller contrloa as requisições HTTP e retorna os dados em um JSON
@RequestMapping("/api/estudantes")//é o endereço da API
public class EstudanteController {
    private final EstudanteService estudanteService;

    public EstudanteController(EstudanteService estudanteService) {
        this.estudanteService = estudanteService;
    }

    @PostMapping
    public ResponseEntity<Estudante> cadastrar(
            @Valid @RequestBody Estudante estudante) {

        Estudante estudanteSalvo =
                estudanteService.cadastrar(estudante);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(estudanteSalvo);
    }
}
