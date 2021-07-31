package linxhq.thienpk.app.controller;

import linxhq.thienpk.app.entity.LeaveRequest;
import linxhq.thienpk.app.repository.LeaveRequestRepository;
import linxhq.thienpk.app.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WebController {
    @Autowired
    private LeaveRequestService service;

    @GetMapping(value = "/list")
    public final ResponseEntity<List<LeaveRequest>> list() {
        List<LeaveRequest> lr = service.findALl();
        return new ResponseEntity<>(lr, HttpStatus.OK);
    }

    @GetMapping(value = "/getPersonalList")
    public final ResponseEntity<List<LeaveRequest>> personalList(@RequestParam String email) {
        List<LeaveRequest> lr = service.findLeaveRequestByEmail(email);
        return new ResponseEntity<>(lr, HttpStatus.OK);
    }

    @GetMapping(value = "/getLeaveRequest")
    public final ResponseEntity<LeaveRequest> personalList(@RequestParam int id) {
        LeaveRequest leaveRequest = service.findLeaveRequestById(id);
        return new ResponseEntity<>(leaveRequest, HttpStatus.OK);
    }

    @PostMapping(value = "/new")
    public final ResponseEntity<?> createRequest(@RequestBody LeaveRequest lr) {
        service.createRequest(lr);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/updateLeaveRequest")
    public final ResponseEntity<?> updateRequest(
            @RequestParam int id,
            @RequestParam String name,
            @RequestParam String start_leave,
            @RequestParam String end_leave,
            @RequestParam String reason,
            @RequestParam String confirm_person,
            @RequestParam String created_date
            ){

        service.updateRequest(id, name, start_leave, end_leave, reason, confirm_person, created_date);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/delete")
    public final ResponseEntity<?> deleteRequest(@RequestParam int id) {
        service.deleteRequest(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/updateStatus")
    public final ResponseEntity<?> updateStatus(@RequestParam int id, @RequestParam String status) {
        service.updateStatus(id, status);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}