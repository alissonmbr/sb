package br.com.sb.restcontroller.model;

public class ErrorResult extends Result {

    private String message;

    public ErrorResult(String message, String status) {
        super(status);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
