package linxhq.thienpk.app.repository.impl;

import linxhq.thienpk.app.repository.LeaveRequestRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

public class LeaveRequestRepositoryImpl implements LeaveRequestRepositoryCustom {
    @PersistenceContext
    private EntityManager manager;

    @Override
    @Transactional
    public void updateRequest(int id, String name, String start_leave, String end_leave, String reason, String confirm_person, String created_date) {
        StringBuilder sql = new StringBuilder("update leave_request set name =:name,");
        sql.append(" start_leave =:startLeave,");
        sql.append(" end_leave =:endLeave,");
        sql.append(" reason =:reason,");
        sql.append(" confirm_person =:confirmPerson,");
        sql.append(" created_date =:createdDate");
        sql.append(" where id =:id");
        Query query = manager.createNativeQuery(sql.toString());
        query.setParameter("name", name);
        query.setParameter("startLeave", start_leave);
        query.setParameter("endLeave", end_leave);
        query.setParameter("reason", reason);
        query.setParameter("confirmPerson", confirm_person);
        query.setParameter("createdDate", created_date);
        query.setParameter("id", id);
        query.executeUpdate();
    }

    @Override
    @Transactional
    public void updateStatus(int id, String status) {
        StringBuilder sql = new StringBuilder("update leave_request set status =:status where id =:id");
        Query query = manager.createNativeQuery(sql.toString());
        query.setParameter("id", id);
        query.setParameter("status", status);
        query.executeUpdate();
    }
}
