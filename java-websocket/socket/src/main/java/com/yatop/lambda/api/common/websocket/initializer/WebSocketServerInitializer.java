package com.yatop.lambda.api.common.websocket.initializer;

import com.yatop.lambda.api.common.websocket.codec.WebSocketPacketCodec;
import com.yatop.lambda.api.common.websocket.config.NettyProperties;
import com.yatop.lambda.api.common.websocket.handler.IMIdleStateHandler;
import com.yatop.lambda.api.common.websocket.util.PipelineUtil;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import org.springframework.stereotype.Component;

/**
 * websocket连接初始化Channel，给Channel关联的pipeline添加handler
 *
 * @author mm
 * @date 2019-04-22
 */
@Component
public class WebSocketServerInitializer extends ChannelInitializer<NioSocketChannel> {

    /**
     * websocket路径
     */
    private String websocketPath;

    /**
     * 最大内容长度
     */
    private int maxContentLength;

    public WebSocketServerInitializer(NettyProperties nettyProperties) {
        this.websocketPath = nettyProperties.getWebsocket().getPath();
        this.maxContentLength = nettyProperties.getWebsocket().getHttpObjectArrgregator().getMaxContentLength();
    }

    @Override
    protected void initChannel(NioSocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        // 处理第一次连接http的握手请求
        pipeline.addLast(new HttpServerCodec());
        // 写文件内容
        pipeline.addLast(new ChunkedWriteHandler());
        // 保证接收的http请求的完整性
        pipeline.addLast(new HttpObjectAggregator(maxContentLength));
        // 处理其他的WebSocketFrame
        pipeline.addLast(new WebSocketServerProtocolHandler(websocketPath));

        // 空闲检测
        ch.pipeline().addLast(new IMIdleStateHandler());

        // WebSocket数据包编解码器
        ch.pipeline().addLast(WebSocketPacketCodec.INSTANCE);

        // 添加tcp/websocket通用handler
        PipelineUtil.addHandler(pipeline);
    }
}
