package linxhq.thienpk.app.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "leave_request")
public class LeaveRequest {
    private static final String STATUS = "Chờ phê duyệt";

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "start_leave")
    private String start_leave;
    @Column(name = "end_leave")
    private String end_leave;
    @Column(name = "reason")
    private String reason;
    @Column(name = "status")
    private String status;
    @Column(name = "confirm_person")
    private String confirm_person;
    @Column(name = "created_date")
    private String created_date;
}

