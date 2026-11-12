package backend.service;

import backend.entity.Estudante;
import backend.repository.EstudanteRepository;
import org.springframework.stereotype.Service;

@Service
//O @Service irá informar ao Spring Boot que a classe EstudanteService contém as RNs do sistema
public class EstudanteService {
    private final EstudanteRepository estudanteRepository;
    public EstudanteService(EstudanteRepository estudanteRepository) {
        this.estudanteRepository = estudanteRepository;
    }
    public Estudante cadastrar(Estudante estudante) {

        if (estudanteRepository.existsByCpf(estudante.getCpf())) {
            throw new IllegalArgumentException("Este CPF já está cadastrado.");
        }

        if (estudanteRepository.existsByEmail(estudante.getEmail())) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado.");
        }

        return estudanteRepository.save(estudante);
    }
}
