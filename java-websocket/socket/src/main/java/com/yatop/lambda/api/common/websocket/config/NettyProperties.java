package com.yatop.lambda.api.common.websocket.config;

import lombok.Data;
import org.springframework.stereotype.Component;

/**
 * Netty配置
 *
 * @author mm
 * @date 2019-04-23
 */
@Data
//@ConfigurationProperties(prefix = "netty")
@Component
public class NettyProperties {

    /**
     * 请求协议
     */
    private String protocol = "WebSocket";

    /**
     * Tcp配置
     */
    private final Tcp tcp = new Tcp();

    /**
     * WebSocket配置
     */
    private final Websocket websocket = new Websocket();

    /**
     * Tcp配置
     */
    @Data
    public static class Tcp {

        /**
         * Tcp端口
         */
        private int port = 8888;

    }

    /**
     * WebSocket配置
     */
    @Data
    public static class Websocket {

        /**
         * WebSocket路径
         */
        private String path = "/chat";

        /**
         * WebSocket端口
         */
        private int port = 9999;

        private final HttpObjectArrgregator httpObjectArrgregator = new HttpObjectArrgregator();

        @Data
        public static class HttpObjectArrgregator {

            /**
             * 最大内容长度
             */
            private int maxContentLength = 1024 * 1024;

        }

    }

}

