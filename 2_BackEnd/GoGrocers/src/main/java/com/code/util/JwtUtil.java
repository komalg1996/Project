package com.code.util;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.code.service.UserDetailmpl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

	@Value("${SECRET_KEY}")
	private String jwtSecret;

	@Value("${EXP_TIMEOUT}")
	private int jwtExpirationMs;

	public String generateJwtToken(Authentication authentication) {
		System.out.println("generate jwt token " + authentication);
		UserDetailmpl userPrincipal = (UserDetailmpl) authentication.getPrincipal();
//JWT : userName,issued at ,exp date,digital signature(does not contain password n authorities)
		return Jwts.builder() // JWTs : a Factory class , used to create JWT tokens
				.setSubject((userPrincipal.getUsername())) // setting subject of the token(typically user name) :sets
															// subject claim part of the token
				.setIssuedAt(new Date())// Sets the JWT Claims iat (issued at) value of current date
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))// Sets the JWT Claims exp
																					// (expiration) value.
				.signWith(SignatureAlgorithm.HS512, jwtSecret) // Signs the constructed JWT using the specified
																// algorithm with the specified key, producing a
																// JWS(Json web signature=signed JWT)
				// Using token signing algo : HMAC using SHA-512
				.compact();// Actually builds the JWT and serializes it to a compact, URL-safe string
	}

	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().// Returns a new JwtParser instance used to parse JWT strings.
					setSigningKey(jwtSecret).// Sets the signing key used to verify JWT digital signature.
					parseClaimsJws(authToken);// Parses the signed JWT returns the resulting Jws<Claims> instance
												// throws exc in case of failures in verification
			return true;
		} catch (Exception e) {
			logger.error("Invalid JWT : " + e.getMessage());
		}
		/*
		 * // catch (SignatureException e) { //
		 * logger.error("Invalid JWT signature: {}", e.getMessage()); // } catch
		 * (MalformedJwtException e) { logger.error("Invalid JWT token: {}",
		 * e.getMessage()); } catch (ExpiredJwtException e) {
		 * logger.error("JWT token is expired: {}", e.getMessage()); } catch
		 * (UnsupportedJwtException e) { logger.error("JWT token is unsupported: {}",
		 * e.getMessage()); } catch (IllegalArgumentException e) {
		 * logger.error("JWT claims string is empty: {}", e.getMessage()); }
		 */
		return false;
	}
}
