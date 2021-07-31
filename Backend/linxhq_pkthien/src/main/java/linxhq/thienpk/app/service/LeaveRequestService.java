package linxhq.thienpk.app.service;

import linxhq.thienpk.app.entity.LeaveRequest;
import org.springframework.stereotype.Service;

import java.util.List;

public interface LeaveRequestService {
    List<LeaveRequest> findALl();
    List<LeaveRequest> findLeaveRequestByEmail(String email);
    LeaveRequest findLeaveRequestById(int id);
    void createRequest(LeaveRequest leaveRequest);
    void updateRequest(int id, String name, String start_leave, String end_leave, String reason, String confirm_person, String created_date);
    void deleteRequest(int id);
    void updateStatus(int id, String status);

}
