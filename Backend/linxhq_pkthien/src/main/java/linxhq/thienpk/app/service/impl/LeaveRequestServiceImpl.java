package linxhq.thienpk.app.service.impl;

import linxhq.thienpk.app.entity.LeaveRequest;
import linxhq.thienpk.app.repository.LeaveRequestRepository;
import linxhq.thienpk.app.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class LeaveRequestServiceImpl implements LeaveRequestService {
    @Autowired
    private LeaveRequestRepository repo;

    @Override
    public List<LeaveRequest> findALl() {
        return repo.findAll();
    }

    @Override
    public List<LeaveRequest> findLeaveRequestByEmail(String email) {
        return repo.findLeaveRequestByEmail(email);
    }

    @Override
    public LeaveRequest findLeaveRequestById(int id) {
        return repo.findLeaveRequestById(id);
    }

    @Override
    public void createRequest(LeaveRequest leaveRequest) {
        leaveRequest.setStatus("Chờ phê duyệt");
        repo.save(leaveRequest);
    }

    @Override
    public void updateRequest(int id, String name, String start_leave, String end_leave, String reason, String confirm_person, String created_date) {
        repo.updateRequest(id, name, start_leave, end_leave, reason, confirm_person, created_date);
    }

    @Override
    public void deleteRequest(int id) {
        repo.deleteById(id);
    }

    @Override
    public void updateStatus(int id, String status) {
        repo.updateStatus(id, status);
    }
}
