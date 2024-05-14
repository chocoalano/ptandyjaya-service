-- for view 1
CREATE VIEW view_jadwal_group_users AS
SELECT 
jg.id, 
jg.date, 
jg.master_group_id, 
mg.user_id_kepgroup, 
mg.nama, 
tc.type, 
tc.jam_mulai, 
tc.jam_berakhir, 
jg.created_at, 
jg.updated_at 
FROM jadwal_groups jg 
join master_groups mg 
on jg.master_group_id = mg.id 
join time_configs tc 
on jg.time_config_id = tc.id;

-- for view 2
CREATE VIEW view_notif_piket_n_istirahat AS
SELECT up.dept_id,
up.role_id,
up.user_id,
up.time,
up.date,
up.img_before,
up.img_after,
up.status as state,
mp.tugas,
up.created_at,
up.updated_at 
FROM user_pikets up 
JOIN master_pikets mp 
ON up.master_piket_id = mp.id;