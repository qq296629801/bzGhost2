package com.yatop.lambda.api.common.websocket.protocol.packet;

import com.yatop.lambda.api.common.websocket.protocol.Packet;
import com.yatop.lambda.api.common.websocket.protocol.command.Command;
import lombok.Data;

/**
 * 登录请求数据包
 *
 * @author mm
 * @date 2019-04-20
 */
@Data
public class LoginRequestPacket extends Packet {

    private String username;
    private String password;
    private int devId;
    private String code;

    @Override
    public Byte getCommand() {
        return Command.LOGIN_REQUEST;
    }

}
