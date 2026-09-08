package br.com.rhconnect.modules.auth.entity;
import jakarta.persistence.*;
import java.util.UUID;

@Table(name = "tb_refresh_token")
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idRefreshToken;
    @Column(nullable = false, unique = true)
    private String token;
    @Column(nullable = false)
    private long expiryDate;
    @Column(nullable = false)
    private UUID familyId;
    @Column(nullable = false)
    private boolean revoked;

    @Column(nullable = false)
    private boolean used ;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Usuario usuario;


    public RefreshToken() {
    }

    public RefreshToken(Usuario usuario, String token, long expiryDate) {
        this(usuario, token, expiryDate, UUID.randomUUID());
    }

    public RefreshToken(Usuario usuario, String token, long expiryDate, UUID familyId) {
        this.usuario = usuario;
        this.token = token;
        this.expiryDate = expiryDate;
        this.familyId = familyId;
        this.revoked = false;
        this.used = false;
    }

    public UUID getIdRefreshToken() {
        return idRefreshToken;
    }

    public void setIdRefreshToken(UUID idRefreshToken) {
        this.idRefreshToken = idRefreshToken;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiryDate() {
        return expiryDate;
    }

    public UUID getFamilyId() {
        return familyId;
    }

    public void setFamilyId(UUID familyId) {
        this.familyId = familyId;
    }

    public void setExpiryDate(long expiryDate) {
        this.expiryDate = expiryDate;
    }

    public boolean isRevoked() {
        return revoked;
    }

    public void setRevoked(boolean revoked) {
        this.revoked = revoked;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}