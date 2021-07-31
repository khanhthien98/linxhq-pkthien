package linxhq.thienpk.app.repository;

import linxhq.thienpk.app.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer>, LeaveRequestRepositoryCustom {
    List<LeaveRequest> findLeaveRequestByEmail (String email);
    LeaveRequest findLeaveRequestById (int id);
}
