package com.yatop.lambda.api.common.websocket.handler;


import cn.hutool.core.bean.BeanUtil;
import com.yatop.lambda.api.common.websocket.protocol.packet.MessageSendRequestPacket;
import com.yatop.lambda.api.common.websocket.protocol.packet.MessageSendResponsePacket;
import com.yatop.lambda.api.common.websocket.session.Tio;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

/**
 * 好友发送通道
 * 保留
 */
@ChannelHandler.Sharable
public class MsgSendRequestHandler extends SimpleChannelInboundHandler<MessageSendRequestPacket> {

    public static final MsgSendRequestHandler INSTANCE = new MsgSendRequestHandler();
    protected final int GROUP = 1;
    protected final int FRIEND = 0;


    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, MessageSendRequestPacket req) throws Exception {
        MessageSendResponsePacket res = new MessageSendResponsePacket();
        BeanUtil.copyProperties(req, res);
        res.setSuccess(true);

        switch (req.getChatType()) {
            case FRIEND:
                Tio.send2B(req.getToUserId(), res);
                break;
            case GROUP:
                Tio.sendToGroup(req.getToUserId(), req, res);
                break;
        }
        Tio.send(ctx, req, res);
    }
}
