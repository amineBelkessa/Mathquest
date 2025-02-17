package com.mathquest.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mathquest.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
}
