package com.yatop.lambda.api.common.websocket.protocol;

import lombok.Data;

/**
 * @author mm
 * @date 2019-04-20
 */
@Data
public abstract class Packet {
    private Byte version = 1;

    private String userId;
    private boolean success;
    private String errorMsg;

    public abstract Byte getCommand();

}
