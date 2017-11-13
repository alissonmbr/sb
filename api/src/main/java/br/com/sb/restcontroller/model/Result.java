package br.com.sb.restcontroller.model;

public class Result {

    public static final String SUCCESS = "success";
    public static final String ERROR = "error";

    private String status;

    public Result() {

    }

    public Result(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
