package br.com.sb.restcontroller.model;

public class SuccessResult<T> extends Result {

    private T data;

    public SuccessResult() {

    }

    public SuccessResult(T data, String status) {
        super(status);
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
