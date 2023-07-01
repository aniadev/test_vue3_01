# Mô tả
### Tạo bảng tables 

```
CREATE TABLE `tables`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `slots` int NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
SET FOREIGN_KEY_CHECKS = 1;
```

### Tạo bảng orders
```
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `table_id` int NULL DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL 
  COMMENT 'CREATED/PAID/CANCELED',
  `transaction_id` bigint NULL DEFAULT NULL,
  `order_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `customer_phone_number` int NULL DEFAULT NULL,
  `customer_id` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `table_id_index`(`table_id` ASC) USING BTREE,
  CONSTRAINT `table_id` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;
SET FOREIGN_KEY_CHECKS = 1;
```

### Query

-- Khi người dùng tạo đơn hàng mới:
- Cập nhật trạng thái đơn hàng đã hết hạn thanh toán sau 15p
- Kiểm tra trong CSDL xem có bất kỳ đơn hàng nào có trạng thái là "CREATED" hoặc "PAID" và trùng thời gian và số bàn với đơn hàng mới không. 
- Nếu có, từ chối đơn hàng mới.
- Nếu không có đơn hàng nào trùng, tạo một đơn hàng mới với trạng thái mặc định là "CREATED".
- Việc update trạng thái đơn hàng sẽ được thực thi trước mỗi lần người dùng đặt đơn.
```
-- tạo đơn hàng mới
INSERT INTO orders (orders.table_id, orders.order_time, orders.status)
VALUES (<table_number>, <order_time>, 'CREATED')
```

```
-- update trạng thái đơn hàng đã hết hạn thanh toán trước khi tạo 1 đơn hàng mới
UPDATE orders SET `orders`.`status` = 'CANCELED' WHERE `orders`.`status` = 'CREATED' AND `orders`.created_at <= NOW() - INTERVAL 15 MINUTE;
SELECT * from orders ;
```
```
-- Check các bàn còn trống
SELECT * FROM `tables` WHERE `tables`.id NOT IN (
	SELECT orders.table_id FROM orders WHERE (orders.`status` = 'CREATED' OR  orders.`status` = 'PAID') 
)
```
```
-- cập nhật trạng thái của đơn hàng sau khi thanh toán 
UPDATE `orders` SET `orders`.`status` = 'PAID' SET `orders`.`transaction_id` = <txs_id> WHERE `orders`.`id` = <id>
```


-- Bảng orders:

[![N|Solid](https://i.ibb.co/Y7xXwm3/fastbook-IMG1688194564732-Sat-Jul012023-135604.png)](https://i.ibb.co/Y7xXwm3/fastbook-IMG1688194564732-Sat-Jul012023-135604.png)

-- Bảng tables:

[![N|Solid](https://i.ibb.co/qxRyqsH/fastbook-IMG1688194568054-Sat-Jul012023-135608.png)](https://i.ibb.co/qxRyqsH/fastbook-IMG1688194568054-Sat-Jul012023-135608.png)

