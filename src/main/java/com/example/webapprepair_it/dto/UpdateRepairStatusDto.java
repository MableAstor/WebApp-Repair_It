package com.example.webapprepair_it.dto;

import com.example.webapprepair_it.entity.RequestStatus;

public class UpdateRepairStatusDto {

    private RequestStatus status;
    private String remark;
    private Long changedByUserId;

    public RequestStatus getStatus() {
        return status;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Long getChangedByUserId() {
        return changedByUserId;
    }

    public void setChangedByUserId(Long changedByUserId) {
        this.changedByUserId = changedByUserId;
    }
}
