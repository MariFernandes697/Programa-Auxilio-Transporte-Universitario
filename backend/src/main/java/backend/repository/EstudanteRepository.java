package backend.repository;

import backend.entity.Estudante;
import org.springframework.data.jpa.repository.JpaRepository;


//Repository será a camada responsável pela comunicação entre a API Java e o Banco de Dados
//O JPA Repository também já disponibiliza opções de salvar, buscar, atualizar e excluir registros sem precisar configurar manualmente

public interface EstudanteRepository extends JpaRepository<Estudante, Long> {

    boolean existsByCpf(String cpf);

    boolean existsByEmail(String email);
}
