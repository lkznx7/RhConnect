package br.com.rhconnect.modules.auth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Table(name = "tb_usuarios")
@Entity
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    String nomeCompleto;
    @Column(name = "emails", unique = true, nullable = false)
    String email;
    @Column(name = "cpfs", unique = true, nullable = false)
    String cpf;
    String telefone;
    @JsonIgnore()
    String senhaHash;
    RoleUser role;
    boolean ativo;
    @CreationTimestamp
    OffsetDateTime criadoEm;
    @UpdateTimestamp
    OffsetDateTime atualizadEm;

    LocalDate dataNascimento;
    Genero genero;
    Boolean pcd;
    String cidade;
    String uf;
    String emailProfissional;
    String areaInteresse;
    String nivelSenioridade;
    BigDecimal expectativaSalarial;
    String modalidadeTrabalhoPreferida;
    String resumoCarreira;
    String linkedinUrl;
    String portfolioUrl;
    String curriculoArquivoUrl;

    String matricula;
    String cargo;
    String departamento;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gestor_imediato_id")
    @JsonIgnore
    Usuario gestorImediato;
    @Column(name = "email_corporativo", unique = true)
    String emailCorporativo;
    LocalDate dataAdmissao;

    public Usuario() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getSenhaHash() {
        return senhaHash;
    }

    public void setSenhaHash(String senhaHash) {
        this.senhaHash = senhaHash;
    }

    public RoleUser getRole() {
        return role;
    }

    public void setRole(RoleUser role) {
        this.role = role;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }

    public OffsetDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(OffsetDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public OffsetDateTime getAtualizadEm() {
        return atualizadEm;
    }

    public void setAtualizadEm(OffsetDateTime atualizadEm) {
        this.atualizadEm = atualizadEm;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public Boolean getPcd() {
        return pcd;
    }

    public void setPcd(Boolean pcd) {
        this.pcd = pcd;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getEmailProfissional() {
        return emailProfissional;
    }

    public void setEmailProfissional(String emailProfissional) {
        this.emailProfissional = emailProfissional;
    }

    public String getAreaInteresse() {
        return areaInteresse;
    }

    public void setAreaInteresse(String areaInteresse) {
        this.areaInteresse = areaInteresse;
    }

    public String getNivelSenioridade() {
        return nivelSenioridade;
    }

    public void setNivelSenioridade(String nivelSenioridade) {
        this.nivelSenioridade = nivelSenioridade;
    }

    public BigDecimal getExpectativaSalarial() {
        return expectativaSalarial;
    }

    public void setExpectativaSalarial(BigDecimal expectativaSalarial) {
        this.expectativaSalarial = expectativaSalarial;
    }

    public String getModalidadeTrabalhoPreferida() {
        return modalidadeTrabalhoPreferida;
    }

    public void setModalidadeTrabalhoPreferida(String modalidadeTrabalhoPreferida) {
        this.modalidadeTrabalhoPreferida = modalidadeTrabalhoPreferida;
    }

    public String getResumoCarreira() {
        return resumoCarreira;
    }

    public void setResumoCarreira(String resumoCarreira) {
        this.resumoCarreira = resumoCarreira;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getPortfolioUrl() {
        return portfolioUrl;
    }

    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }

    public String getCurriculoArquivoUrl() {
        return curriculoArquivoUrl;
    }

    public void setCurriculoArquivoUrl(String curriculoArquivoUrl) {
        this.curriculoArquivoUrl = curriculoArquivoUrl;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public Usuario getGestorImediato() {
        return gestorImediato;
    }

    public void setGestorImediato(Usuario gestorImediato) {
        this.gestorImediato = gestorImediato;
    }

    public String getEmailCorporativo() {
        return emailCorporativo;
    }

    public void setEmailCorporativo(String emailCorporativo) {
        this.emailCorporativo = emailCorporativo;
    }

    public LocalDate getDataAdmissao() {
        return dataAdmissao;
    }

    public void setDataAdmissao(LocalDate dataAdmissao) {
        this.dataAdmissao = dataAdmissao;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public @Nullable String getPassword() {
        return senhaHash;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }
}
