package com.yatop.lambda.api.common.websocket.session;

import com.yatop.lambda.api.common.websocket.protocol.Packet;
import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class Tio {

    private static LocalSession local;
    private static Packet packet;

    private static void checkChannel(Channel channel, String userId) throws Exception {
        // 注销其他端登录用户
        LocalSession system = Users.getInstance().get(userId);

        if (null != system && !system.equals(channel)) {

            Users.getInstance().unbind(userId, system);
            Users.getInstance().closeChannel(system);
        }

        // 创建通道绑定
        local = LocalSession.get(channel);
        if (null == local) {
            local = new LocalSession();
            local.setUserId(userId);
            local.bind(channel);
        }

        // 切换用户
        if (!local.getUserId().equals(userId)) {
            local.setUserId(userId);
            local.bind(channel);
        }

        //添加通道
        Users.getInstance().bind(userId, local);
    }

    /**
     * 绑定用户通道
     *
     * @param channel
     * @param userId
     * @throws Exception
     */
    public static void bind(Channel channel, String userId) throws Exception {
        checkChannel(channel, userId);
    }


    /**
     * 移除绑定
     *
     * @param channel
     * @param userid
     */
    public static void unbind(Channel channel, String userid) {
        local = LocalSession.get(channel);
        if (null == local) {
            return;
        }
        Users.getInstance().unbind(userid, local);
        Users.getInstance().closeChannel(local);
    }


    /**
     * 加入群组通道
     *
     * @param groupId
     * @param channel
     */
    public static void joinGroup(String groupId, Channel channel) {
        local = LocalSession.get(channel);
        if (null == local) {
            return;
        }
        Groups.getInstance().bind(groupId, local);
    }

    public static void quitGroup(String groupId, Channel channel) {
        local = LocalSession.get(channel);
        if (null == local) {
            return;
        }
        Groups.getInstance().unbind(groupId, local);
    }


    /**
     * 需要判断通道是否是自己并且绑定通道
     *
     * @param ctx
     * @param req
     * @param res
     */
    public static void send(ChannelHandlerContext ctx, Packet req, Packet res) throws Exception {
        if ("".equals(req.getUserId()) || null == req.getUserId()) {
            res.setSuccess(false);
            res.setErrorMsg("当前用户没有绑定通道");
            Users.getInstance().send(ctx.channel(), res);
            return;
        }


        // 刷新页面的时候重新绑定i
        checkChannel(ctx.channel(), req.getUserId());

        Users.getInstance().send(ctx.channel(), res);
    }

    /**
     * 发送对方不需要重建通道绑定
     *
     * @param toUserId
     * @param packet
     */
    public static void send2B(String toUserId, Packet packet) {
        local = Users.getInstance().get(toUserId);
        if (null == local) {
            return;
        }
        Users.getInstance().send(local.getChannel(), packet);
    }

    /**
     * 需要判断自己是否在群组通道里面
     *
     * @param groupId
     * @param req
     * @param res
     */
    public static void sendToGroup(String groupId, Packet req, Packet res) {
        local = Users.getInstance().get(req.getUserId());
        if (null == local) return;
        Groups.getInstance().sendToGroup(groupId, res);
    }

    /**
     * 给所有发送消息
     *
     * @param res
     * @param ctx
     */
    public static void sendToAll(Packet res, ChannelHandlerContext ctx) {
        packet = res;
        local = LocalSession.get(ctx.channel());
        if (null == local) {
            return;
        }
        Users.getInstance().sendAll(packet);
    }
}
