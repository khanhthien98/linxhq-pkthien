package linxhq.thienpk.app.repository;

import java.util.List;

public interface LeaveRequestRepositoryCustom {
    void updateRequest(int id, String name, String start_leave, String end_leave, String reason, String confirm_person, String created_date);
    void updateStatus(int id, String status);
}
