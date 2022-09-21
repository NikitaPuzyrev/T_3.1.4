package com.example.tt.dao;

import com.example.tt.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
public class UserDaoImpl implements UserDao {
    private List<User> list;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("select  u from User u", User.class).getResultList();
    }

    @Override
    public User findById(int id) {
        list = entityManager.createQuery("select user from User user where user.id =: idParam", User.class)
                .setParameter("idParam", id).getResultList();
        if (list != null) {
            return list.get(0);
        } else {
            return null;
        }
    }

    @Override
    public void saveUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public void deleteById(int id) {
        User userToBeDeleted = findById(id);
        entityManager.remove(userToBeDeleted);
    }

    @Override
    public User findByUsername(String userName) {
        list = entityManager.createQuery("select user from User user where user.username =: usernameParam", User.class)
                .setParameter("usernameParam", userName).getResultList();
        if (list != null) {
            return list.get(0);
        } else {
            return null;
        }
    }

}